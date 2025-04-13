// utils/formatChartData.ts
const monthShortMap: Record<string, string> = {
  janeiro: "Jan",
  fevereiro: "Fev",
  março: "Mar",
  abril: "Abr",
  maio: "Mai",
  junho: "Jun",
  julho: "Jul",
  agosto: "Ago",
  setembro: "Set",
  outubro: "Out",
  novembro: "Nov",
  dezembro: "Dez",
};

export function formatMonthChartData(monthData: { label: string; revenue: number; expense: number }[]) {
  const chartData = [];

  for (let i = 0; i < monthData.length; i++) {
    const item = monthData[i];

    // Mês abreviado (em português)
    const shortLabel = monthShortMap[item.label.toLowerCase()] ?? item.label;

    chartData.push({
      value: item.revenue,
      label: shortLabel,
      spacing: 2,
      frontColor: "#0d723f", // Cor da receita
    });

    chartData.push({
      value: item.expense,
      frontColor: "#960f0f", // Cor da despesa
    });
  }

  return chartData;
}
