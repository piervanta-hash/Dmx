interface OptionGroupProps<T extends string> {
  name: string;
  legend: string;
  options: readonly T[];
  value: T | undefined;
  onChange: (value: T) => void;
  optionLabel: (key: T) => string;
}

/** Gruppo di opzioni a scelta singola per un passo del configuratore — radio nativi, stile a righe piene. */
export function OptionGroup<T extends string>({ name, legend, options, value, onChange, optionLabel }: OptionGroupProps<T>) {
  return (
    <fieldset>
      <legend className="type-display text-display-3 text-grafite">{legend}</legend>
      <div className="mt-6 flex flex-col gap-3">
        {options.map((opt) => (
          <label
            key={opt}
            className={`type-body flex cursor-pointer items-center gap-4 border px-6 py-4 transition-colors ${
              value === opt ? "border-genziana text-genziana" : "border-grafite/25 text-grafite hover:border-grafite/50"
            }`}
          >
            <input
              type="radio"
              name={name}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="h-4 w-4 accent-genziana"
            />
            {optionLabel(opt)}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
