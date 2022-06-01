export default function Clear(
  _setContent: (_callback: any) => void,
  _setShowInput: (_callback: boolean) => void,
): void {
  _setContent([]);
  _setShowInput(true);
}
