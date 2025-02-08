async function cargarCompras() {
    try {
        const response = await fetch('/techpro-main/backend/VERCOMPRASUSUARIO/comprasusuario.php');
        const compras = await response.json();

        const tbody = document.getElementById('compras-tbody');
        tbody.innerHTML = ''; 

        compras.forEach(compra => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', compra.id);  

            row.innerHTML = `
                <td>${compra.id}</td>
                <td>${compra.nombrecompleto}</td>
                <td>${compra.ciudad}</td>
                <td>${compra.numerodetelefono}</td>
                <td>${compra.email}</td>
                <td>${compra.metododeenvio}</td>
                <td>${compra.direccion}</td>
                <td>${compra.metododepago}</td>
                <td>
                    ${compra.productos.length > 0
                        ? compra.productos.map(p => `${p.nombreProducto} (Cantidad: ${p.cantidad})`).join('<br>')
                        : 'No hay productos'}
                </td>
                <td>
                    <button onclick="rechazarCompra(${compra.id}, this)">Rechazar compra</button>
                </td>
            `;

            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar las compras:', error);
    }
}

async function rechazarCompra(idCompra) {
    try {
        const response = await fetch('/techpro-main/backend/VERCOMPRASUSUARIO/comprasusuario.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idCompra: idCompra })
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();  

        if (data.status === "success") {
            console.log(data.message); 
        } else {
            console.error("Error:", data.message);
        }
    } catch (error) {
        console.error('Error al rechazar la compra:', error);
    }
}


window.onload = cargarCompras;
