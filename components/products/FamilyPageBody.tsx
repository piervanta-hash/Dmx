import { useTranslations } from "next-intl";
import { FamilyModelCard } from "@/components/products/FamilyModelCard";
import { modelsByFamily, type FamilyKey } from "@/lib/products-data";

const PAGE_KEY: Record<FamilyKey, "productsOffices" | "productsHousing" | "productsSanitary" | "productsSpecial" | "productsHospitality"> = {
  offices: "productsOffices",
  housing: "productsHousing",
  sanitary: "productsSanitary",
  special: "productsSpecial",
  hospitality: "productsHospitality",
};

/** Corpo condiviso delle 5 pagine famiglia: intestazione + elenco modelli reali. */
export function FamilyPageBody({ family }: { family: FamilyKey }) {
  const t = useTranslations("pages");
  const tf = useTranslations("products.familyLead");
  const models = modelsByFamily(family);

  return (
    <>
      <section className="bg-calce px-8 py-24 md:px-20 md:py-32">
        <h1 className="type-display text-display-1 text-grafite">{t(`${PAGE_KEY[family]}.title`)}</h1>
        <p className="type-body text-body-lg mt-6 max-w-xl text-grafite/75">{tf(family)}</p>
      </section>
      <section className="bg-zinco">
        <div className="flex flex-col">
          {models.map((model) => (
            <FamilyModelCard key={model.code} model={model} />
          ))}
        </div>
      </section>
    </>
  );
}
