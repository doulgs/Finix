/**
 * Formata um número como moeda brasileira (BRL).
 *
 * @param value - O valor numérico a ser formatado. Se não for um número finito, será tratado como 0.
 * @returns Uma string formatada como moeda brasileira. Exemplo: `R$ 1.000,00`
 */
export function formatToCurrency(value: number | null | undefined): string {
  // Converte o valor para número e valida se é finito; caso contrário, utiliza 0.
  const numericValue = Number(value);
  const validValue = Number.isFinite(numericValue) ? numericValue : 0;

  // Formata o número como moeda brasileira utilizando o locale "pt-BR".
  const formattedValue = validValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Garante que haja um espaço após o símbolo da moeda (ex: "R$ ") caso não esteja presente.
  return formattedValue.replace(/^(\D+)/, "$1 ");
}

export const formatStringToCurrency = (value: string): string => {
  const number = formatCurrencyToNumber(value);
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};

export const formatCurrencyToNumber = (value: string): number => {
  if (!value) return 0;

  const clean = value
    .replace("R$", "")
    .replace(/\s/g, "")
    .replace(/\./g, "") // remove pontos de milhar
    .replace(",", "."); // transforma vírgula decimal em ponto

  return parseFloat(clean) || 0;
};

export const formatCentavosToCurrency = (value: string): string => {
  if (!value) return "R$ 0,00";

  // remove zeros à esquerda
  const numeric = value.replace(/\D/g, "");
  const centavos = parseFloat((parseInt(numeric || "0") / 100).toFixed(2));

  return centavos.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};

export const formatToBRLCurrency = (value: string | number): string => {
  const number = typeof value === "string" ? parseFloat(value) : value;
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};
