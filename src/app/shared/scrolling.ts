export function scrollElementIntoView(documentRef: Document, sectionId: string): void {
  documentRef.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
