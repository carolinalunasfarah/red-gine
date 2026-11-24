import Image from "next/image";

export const Information = () => {
    return (
        <div>
            <article className="mb-4 flex items-center gap-2">
                <Image
                    src="/logo-accent.png"
                    alt="Red Gine"
                    width={100}
                    height={100}
                    className="size-14"
                />
                <h2 className="text-xl font-bold mb-2">Red Gine</h2>
            </article>
            <p className="text-md">
                Garantizar una atención médica empática, informada y libre de
                estigmas es parte de la ética en salud. En el marco de la ley
                21.030 (IVE 3 causales) y el cuidado integral de la salud sexual
                y reproductiva, existen ginecólogas y equipos de salud NO
                objetores en todo el territorio nacional comprometidos con
                acompañar a sus pacientes.
            </p>
        </div>
    );
};
