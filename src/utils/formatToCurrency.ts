/**
 * Formata um número como moeda brasileira (BRL).
 *
 * @param value - O valor numérico a ser formatado. Se não for um número finito, será tratado como 0.
 * @returns Uma string formatada como moeda brasileira. Exemplo: `R$ 1.000,00`
 */
export function formatToCurrency(value: number | null | undefined): string {
  const numericValue = Number(value);
  const validValue = Number.isFinite(numericValue) ? numericValue : 0;
  // Garante pelo menos duas casas decimais e separador de milhares
  return validValue
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(/^(\D+)/, "$1 "); // assegura espaço após R$
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
