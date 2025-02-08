<?php namespace App\Controller;

use Mustache_Engine;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;

class ServerController extends AbstractController
{
    private $mustache;

    public function __construct()
    {
        $this->mustache = new Mustache_Engine(["entity_flags" => ENT_QUOTES]);
    }

    public function index(Request $request)
    {
        $sdkUrl = SdkScriptHelpers::getPayPalSDKUrl();
        $clientToken = SdkScriptHelpers::getClientToken();

        $locals = [
            "title" => "Fastlane - Paypal Integration",
            "prerequisiteScripts" => "
                <script src='$sdkUrl'
                    data-sdk-client-token='$clientToken'
                    defer
                ></script>
            ",
            "initScriptPath" => "app.js",
            "stylesheetPath" => "styles.css",
        ];

        $htmlTemplate = file_get_contents(
            __DIR__ . "/../../../client/views/checkout.html"
        );

        $template = $this->mustache->render($htmlTemplate, $locals);

        return new Response($template);
    }

    public function createTransaction(Request $request)
    {
        $data = $request->toArray();

        $url = Env::get("PAYPAL_API_BASE_URL") . "/v2/checkout/orders";

        $accessToken = SdkScriptHelpers::getAccessToken();

        $headers = [
            "PayPal-Request-Id" => (string) (time() * 1000),
            "Authorization" => "Bearer " . $accessToken,
            "Content-Type" => "application/json",
        ];

        $httpClient = HttpClient::create();

        $body = [
            "intent" => "CAPTURE",
            "payment_source" => [
                "card" => [
                    "single_use_token" => $data["paymentToken"]["id"],
                ],
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => "100",
                    ],
                ],
            ],
        ];
        

        $result = $httpClient
            ->request("POST", $url, [
                "headers" => $headers,
                "body" => json_encode($body),
            ])
            ->toArray();

        return new JsonResponse(["result" => $result]);
    }
    
}
class Auth
{
    public static function getAuthAssertionToken(
        string $clientId,
        string $merchantId
    ): string {
        $header = [
            "alg" => "none",
        ];

        $body = [
            "iss" => $clientId,
            "payer_id" => $merchantId,
        ];

        $signature = "";

        $jwtParts = [$header, $body, $signature];

        $authAssertion = array_map(function ($part) {
            return $part && base64_encode(json_encode($part));
        }, $jwtParts);

        return join(".", $authAssertion);
    }
}

class Env
{
    static function get(string $key): string|null
    {
        return $_ENV[$key] ?? null;
    }
}

class SdkScriptHelpers
{
    public static function getPayPalSDKUrl(): string
    {
        $sdkUrl = Env::get("PAYPAL_SDK_BASE_URL") . "/sdk/js";

        $sdkQueryParams = http_build_query([
            "client-id" => Env::get("PAYPAL_CLIENT_ID"),
            "components" => "buttons,fastlane",
        ]);

        $fullUrl = $sdkUrl . "?" . $sdkQueryParams;

        return $fullUrl;
    }

    public static function getClientToken(): string
    {
        if (
            !Env::get("PAYPAL_CLIENT_ID") ||
            !Env::get("PAYPAL_CLIENT_SECRET")
        ) {
            throw new Error("Missing API credentials");
        }

        $httpClient = HttpClient::create();

        $url = Env::get("PAYPAL_API_BASE_URL") . "/v1/oauth2/token";

        $authKey = base64_encode(
            Env::get("PAYPAL_CLIENT_ID") .
                ":" .
                Env::get("PAYPAL_CLIENT_SECRET")
        );

        $headers = [
            "Authorization" => "Basic " . $authKey,
            "Content-Type" => "application/x-www-form-urlencoded",
        ];

        if (Env::get("PAYPAL_MERCHANT_ID")) {
            $headers["PayPal-Auth-Assertion"] = Auth::getAuthAssertionToken(
                Env::get("PAYPAL_CLIENT_ID"),
                Env::get("PAYPAL_MERCHANT_ID")
            );
        }

        $response = $httpClient
            ->request("POST", $url, [
                "headers" => $headers,
                "body" => [
                    "grant_type" => "client_credentials",
                    "response_type" => "client_token",
                    "intent" => "sdk_init",
                    "domains[]" => Env::get("DOMAINS"),
                ],
            ])
            ->toArray();

        return $response["access_token"];
    }
    
    public static function getAccessToken(): string
    {
        if (
            !Env::get("PAYPAL_CLIENT_ID") ||
            !Env::get("PAYPAL_CLIENT_SECRET")
        ) {
            throw new Error("Missing API credentials");
        }

        $httpClient = HttpClient::create();

        $url = Env::get("PAYPAL_API_BASE_URL") . "/v1/oauth2/token";

        $authKey = base64_encode(
            Env::get("PAYPAL_CLIENT_ID") .
                ":" .
                Env::get("PAYPAL_CLIENT_SECRET")
        );

        $headers = [
            "Authorization" => "Basic " . $authKey,
            "Content-Type" => "application/x-www-form-urlencoded",
        ];

        if (Env::get("PAYPAL_MERCHANT_ID")) {
            $headers["PayPal-Partner-Attribution-ID"] = Env::get(
                "PAYPAL_MERCHANT_ID"
            );
            $headers["PayPal-Auth-Assertion"] = Auth::getAuthAssertionToken(
                Env::get("PAYPAL_CLIENT_ID"),
                Env::get("PAYPAL_MERCHANT_ID")
            );
        }

        $response = $httpClient
            ->request("POST", $url, [
                "headers" => $headers,
                "body" => [
                    "grant_type" => "client_credentials",
                ],
            ])
            ->toArray();

        return $response["access_token"];
    }
} 
