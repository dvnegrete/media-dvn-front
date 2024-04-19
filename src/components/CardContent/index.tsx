export const CardContent = () => {
    const image = true;
    const video = true;
    const document = true;
    return (
        <>
            <h3>Titulo del contenido.</h3>
            <div>
                <p>Descripcion o contenido</p>
            </div>

            <div>
                {image ?
                    <img src="" />
                    :
                    <></>
                }
                {video ?
                    <video src="" />
                    :
                    <></>
                }
                {document ?
                    <a href={"pdf"} download={"nombre de archivo.pdf"}></a>
                    :
                    <></>
                }

            </div>

            <h5>Creditos: {"nombre de usuario"}</h5>
        </>
    )
}