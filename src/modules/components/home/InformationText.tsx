export function InformationText({ text }: { text: string }) {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
        if (!part.startsWith("**")) return part;

        return (
            <strong key={index} className="font-bold">
                {part.slice(2, -2)}
            </strong>
        );
    });
}
