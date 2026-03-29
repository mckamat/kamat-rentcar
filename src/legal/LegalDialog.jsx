import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { PrivacyPolicyContent, TermsOfUseContent } from "./LegalPolicyContent";

/**
 * @param {'privacy' | 'terms' | null} type
 * @param {() => void} onHide
 */
export function LegalDialog({ type, onHide }) {
  const visible = type === "privacy" || type === "terms";

  const header =
    type === "privacy"
      ? "Gizlilik Politikası ve KVKK"
      : type === "terms"
        ? "Araç Kiralama Kullanım Şartları"
        : "";

  const footer = (
    <Button type="button" label="Kapat" icon="pi pi-times" onClick={onHide} />
  );

  return (
    <Dialog
      className="legal-dialog"
      header={header}
      visible={visible}
      onHide={onHide}
      footer={footer}
      modal
      dismissableMask
      draggable={false}
      style={{ width: "min(720px, 94vw)" }}
      breakpoints={{ "768px": "95vw" }}
      contentStyle={{ paddingTop: "0.5rem" }}
    >
      {type === "privacy" ? (
        <PrivacyPolicyContent />
      ) : type === "terms" ? (
        <TermsOfUseContent />
      ) : null}
    </Dialog>
  );
}
