import { getV1Document } from "@/lib/v1";
import { MobileMenuController } from "./mobile-menu-controller";

export async function V1ReferencePage({ source }: { source: string }) {
  const document = await getV1Document(source);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: document.styles }} />
      <div
        className="v1-document"
        dangerouslySetInnerHTML={{ __html: document.html }}
      />
      <MobileMenuController />
    </>
  );
}
