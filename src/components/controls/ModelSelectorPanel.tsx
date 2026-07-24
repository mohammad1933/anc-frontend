import { useConfigurator, type MockupModelType } from "@/hooks/ConfiguratorContext";

const MODELS: Array<{ id: MockupModelType; label: string }> = [
  { id: "sofa", label: "Sofa" },
  { id: "curtain", label: "Curtain" },
];

export function ModelSelectorPanel() {
  const { mockupModel, setMockupModel } = useConfigurator();

  return (
    <section className="grid gap-3">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-atelier-muted">Mockup model</p>
        <h2 className="mt-1 font-display text-lg text-atelier-ivory">Choose Furniture</h2>
      </div>
      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Mockup model">
        {MODELS.map((model) => (
          <button
            key={model.id}
            type="button"
            aria-pressed={mockupModel === model.id}
            onClick={() => setMockupModel(model.id)}
            className={`rounded-sm border px-3 py-2.5 font-mono text-[10px] uppercase tracking-widest2 ${
              mockupModel === model.id
                ? "border-atelier-brass bg-atelier-brass text-atelier-obsidian"
                : "border-atelier-line text-atelier-ivory"
            }`}
          >
            {model.label}
          </button>
        ))}
      </div>
    </section>
  );
}
