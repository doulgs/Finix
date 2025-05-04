/**
 * Formata um número como moeda brasileira (BRL).
 *
 * @param value - O valor numérico a ser formatado. Se não for um número finito, será tratado como 0.
 * @param visible - Indica se o valor deve ser exibido ou ocultado. Se `false`, mantém "R$" visível e substitui o restante da string por asteriscos com o mesmo número de caracteres.
 * @returns Uma string formatada como moeda brasileira (ex: `R$ 1.000,00`) ou mascarada (ex: `R$ ********`).
 */
export function formatToCurrency(value: number | null | undefined, visible: boolean = true): string {
  const numericValue = Number(value);
  const validValue = Number.isFinite(numericValue) ? numericValue : 0;

  const formatted = validValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (!visible) {
    const match = formatted.match(/^(\D+)(.+)$/); // separa prefixo (ex: "R$ ") do valor
    if (match) {
      const prefix = match[1].trimEnd(); // "R$"
      const restLength = match[2].length;
      return `${prefix} ${"*".repeat(restLength)}`;
    }
    return "R$ ****"; // fallback
  }

  return formatted.replace(/^(\D+)/, "$1 "); // garante espaço após "R$"
}

/**
 * Converte uma string formatada (ex: "R$ 1.234,56" ou "1.234,56") em número.
 *
 * @param value - A string a ser convertida.
 * @returns O valor numérico correspondente, ou 0 se não puder parsear.
 */
export function parseCurrency(value: string): number {
  if (!value) return 0;
  // Remove tudo que não for dígito ou vírgula/ponto de forma adequada
  const clean = value
    .replace(/\s/g, "") // tira espaços
    .replace(/^R\$\s?/, "") // tira prefixo R$
    .replace(/\./g, "") // remove pontos de milhar
    .replace(/,/g, "."); // transforma vírgula decimal em ponto

  const n = parseFloat(clean);
  return Number.isFinite(n) ? n : 0;
}
