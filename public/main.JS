// Định nghĩa hàm xử lý khi nút được click

async function handleAddToCartButtonClick(event) {
    // Kiểm tra xem nút được click có class là 'add-to-cart-btn' hay không
    if (event.target.classList.contains('add-to-cart-btn_button')) {
        event.preventDefault();
        // Lấy thông tin từ data attributes
        const tableId = event.target.getAttribute('data-table-id');
        const productId = event.target.getAttribute('data-product-id');
        // Sử dụng Fetch API để gửi dữ liệu đến API
        try {
            const response = await fetch('/api/v1/table/add_table_product/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_table: tableId, id_product: productId }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Xử lý phản hồi từ API (nếu cần)
            const result = await response.json();
            console.log("Ket qua:::", result);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    }
}

// Đăng ký hàm xử lý sự kiện cho sự kiện click trên toàn bộ tài liệu
//document.addEventListener('click', handleAddToCartButtonClick);


// document.addEventListener('click',async function(event) {
    
//     // Kiểm tra xem nút được click có class là 'add-to-cart-btn' hay không
//     if (event.target.classList.contains('add-to-cart-btn_button')) {
//         event.preventDefault();
//         // Lấy thông tin từ data attributes
//         const tableId = event.target.getAttribute('data-table-id');
//         const productId = event.target.getAttribute('data-product-id');
//         // Sử dụng Fetch API để gửi dữ liệu đến API
//        try {
//         const response = await fetch('/api/v1/table/add_table_product/add', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ id_table: tableId, id_product: productId }),
//         });
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         // Xử lý phản hồi từ API (nếu cần)
//         const result = await response.json();
//         console.log("Ket qua:::",result);
       
//        } catch (error) {
//         console.error('There was a problem with the fetch operation:', error.message);
//     } 
//     }
// });