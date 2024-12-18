function Footer()
{
    return(
        <>
            <style>
                {`
                    .footer  
                    {
                        width: 100%;
                        height: 6rem;
                        background-color: #DD3333;
                        color: white;
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.5rem;
                    }
                `
                }

            </style>
            <div className="footer">
                © 2024 Football prediction. All rights reserved.
            </div>
        </>
    )
}
export default Footer;