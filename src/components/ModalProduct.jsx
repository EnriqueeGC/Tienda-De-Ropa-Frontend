import './Modal.css';
import React, { useState, useEffect } from 'react';

const ModalProduct = ({ producto, onClose, isEditMode }) => {
    const [nombre_producto, setNombre_producto] = useState(isEditMode ? producto.NOMBRE_PRODUCTO : '');
    const [descripcion, setDescripcion] = useState(isEditMode ? producto.DESCRIPCION : '');
    const [precio, setPrecio] = useState(isEditMode ? producto.PRECIO : '');
    const [id_subcategoria, setId_subcategoria] = useState(isEditMode ? producto.ID_SUBCATEGORIA : '');
    const [id_descuento, setId_descuento] = useState(isEditMode ? producto.ID_DESCUENTO : '');
    const [genero, setGenero] = useState(isEditMode ? producto.GENERO : '');
    const [marca, setMarca] = useState(isEditMode ? producto.MARCA : '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(isEditMode ? producto.URL_IMAGEN : '');
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [descuentos, setDescuentos] = useState([]);

    useEffect(() => {
        // Fetch de categorías, subcategorías y descuentos
        const fetchCategorias = async () => {
            try {
                const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/categories/getAll');
                if (!response.ok) {
                    throw new Error('Error al obtener las categorías');
                }
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener las categorías', error);
            }
        };

        const fetchSubCategorias = async () => {
            try {
                const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/subcategories/getAll');
                if (!response.ok) {
                    throw new Error('Error al obtener las categorías');
                }
                const data = await response.json();
                setSubcategorias(data);
            } catch (error) {
                console.error('Error al obtener las categorías', error);
            }
        };

        const fetchDescuentos = async () => {
            try {
                const response = await fetch('https://tienda-de-ropa-v6h4.onrender.com/api/discounts/getAll');
                if (!response.ok) {
                    throw new Error('Error al obtener los descuentos');
                }
                const data = await response.json();
                setDescuentos(data);
            } catch (error) {
                console.error('Error al obtener los descuentos', error);
            }
        };

        fetchCategorias();
        fetchDescuentos();
        fetchSubCategorias();
    }, []);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0])); // Previsualizar imagen seleccionada
    };

    const handleGuardarCambios = async () => {
        try {
            const formData = new FormData(); // Usamos FormData para incluir el archivo de imagen
            formData.append('nombre_producto', nombre_producto);
            formData.append('descripcion', descripcion);
            formData.append('precio', precio);
            formData.append('id_subcategoria', id_subcategoria || '');
            formData.append('id_descuento', id_descuento || '');
            formData.append('genero', genero);
            formData.append('marca', marca);

            if (image) {
                formData.append('image', image); // Agregamos la imagen si se seleccionó
            }

            let response;

            console.log(formData);

            if (isEditMode) {
                response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/products/updateProductById/${producto.ID_PRODUCTO}`, {
                    method: 'PUT',
                    body: formData, // Enviamos formData en lugar de JSON
                });
            } else {
                response = await fetch(`https://tienda-de-ropa-v6h4.onrender.com/api/products/create`, {
                    method: 'POST',
                    body: formData, // Enviamos formData en lugar de JSON
                });
            }

            if (!response.ok) {
                throw new Error(isEditMode ? 'Error al actualizar el producto' : 'Error al agregar el producto');
            }

            onClose(); // Cerramos el modal tras la operación exitosa
        } catch (error) {
            console.error(isEditMode ? 'Error al actualizar el producto' : 'Error al agregar el producto', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content modal-horizontal">
                <h2>{isEditMode ? 'Modificar Producto' : 'Agregar Producto'}</h2>

                <div className="modal-body">
                    <div className="modal-column">
                        <label>Nombre:</label>
                        <input value={nombre_producto} onChange={(e) => setNombre_producto(e.target.value)} />

                        <label>Descripción:</label>
                        <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

                        <label>Precio:</label>
                        <input value={precio} onChange={(e) => setPrecio(e.target.value)} />

                        <label>Marca:</label>
                        <input value={marca} onChange={(e) => setMarca(e.target.value)} />
                    </div>

                    <div className="modal-column">
                        <label>Subcategoría:</label>
                        <select value={id_subcategoria} onChange={(e) => setId_subcategoria(e.target.value)}>
                            <option value="">Seleccione una subcategoría</option>
                            {subcategorias.map(subcategoria => (
                                <option key={subcategoria.ID_SUBCATEGORIA} value={subcategoria.ID_SUBCATEGORIA}>
                                    {subcategoria.NOMBRE}
                                </option>
                            ))}
                        </select>

                        <label>Descuento:</label>
                        <select value={id_descuento} onChange={(e) => setId_descuento(e.target.value)}>
                            <option value="">Seleccione un descuento</option>
                            {descuentos.map(descuento => (
                                <option key={descuento.ID_DESCUENTO} value={descuento.ID_DESCUENTO}>
                                    {descuento.VALOR_DESCUENTO}%
                                </option>
                            ))}
                        </select>

                        <label>Género:</label>
                        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                            <option value="">Seleccione un género</option>
                            <option value="Hombre">Hombre</option>
                            <option value="Mujer">Mujer</option>
                            <option value="Ninio">Niño</option>
                            <option value="Unisex">Unisex</option>
                        </select>

                        <label>Imagen:</label>
                        <input type="file" onChange={handleImageChange} />
                    </div>

                    <div className="modal-column">
                        <h4>Vista previa de la imagen:</h4>
                        {imagePreview ? (
                            <img src={imagePreview} alt="Vista previa del producto" className="image-preview" />
                        ) : (
                            <p>No hay imagen disponible</p>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <button onClick={handleGuardarCambios}>
                        {isEditMode ? 'Guardar Cambios' : 'Agregar Producto'}
                    </button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};



export default ModalProduct;

