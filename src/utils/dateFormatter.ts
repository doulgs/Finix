import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import weekOfYear from "dayjs/plugin/weekOfYear";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import "dayjs/locale/pt-br";

// Extensões para UTC, timezones, formatos localizados, semana e trimestre
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(quarterOfYear);
dayjs.locale("pt-br");

// Fuso horário padrão
const DEFAULT_TIMEZONE = "America/Sao_Paulo" as const;

// Função auxiliar para capitalizar a primeira letra
const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Estilos de formatação de data/hora suportados.
 */
export type DateFormatStyle =
  // Formatos de horário
  | "time24" // Ex: 15:30
  | "time24Seconds" // Ex: 15:30:45
  | "time12" // Ex: 03:30 PM
  | "time12Seconds" // Ex: 03:30:45 PM
  // Formatos de data (pt-br)
  | "dateShort" // Ex: 18/04/25
  | "dateMedium" // Ex: 18/04/2025
  | "dateLong" // Ex: 18 de abril de 2025
  | "dateFull" // Ex: sexta-feira, 18 de abril de 2025
  // Formatos de data (en)
  | "usDateShort" // Ex: 04/18/25
  | "usDateMedium" // Ex: 04/18/2025
  | "enDateLong" // Ex: April 18, 2025
  | "enDateFull" // Ex: Friday, April 18, 2025
  // Formatos de data-hora
  | "dateTimeShort" // Ex: 18/04/25 15:30
  | "dateTimeMedium" // Ex: 18/04/2025 às 15:30
  | "dateTimeLong" // Ex: 18 de abril de 2025 às 15:30
  | "enDateTimeLong" // Ex: April 18, 2025 3:30 PM
  // ISO e RFC
  | "isoDate" // Ex: 2025-04-18
  | "isoDateTime" // Ex: 2025-04-18T15:30:45-03:00
  | "rfc2822" // Ex: Fri, 18 Apr 2025 15:30:45 -0300
  // Outros
  | "day" // Ex: 18
  | "dayName" // Ex: sexta-feira
  | "dayMonth" // Ex: 18/04
  | "dayMonthName" // Ex: 18 de abril
  | "month" // Ex: 04
  | "monthNameShort" // Ex: abr
  | "monthNameLong" // Ex: abril
  | "monthYear" // Ex: abril/2025
  | "year" // Ex: 2025
  | "quarter" // Ex: 2º trimestre
  | "weekOfYear"; // Ex: 16ª semana

/**
 * Mapeamento de estilos para padrões de formato do dayjs.
 */
const DATE_FORMATS = {
  time24: "HH:mm", // Ex: 15:30
  time24Seconds: "HH:mm:ss", // Ex: 15:30:45
  time12: "hh:mm A", // Ex: 03:30 PM
  time12Seconds: "hh:mm:ss A", // Ex: 03:30:45 PM

  dateShort: "DD/MM/YY", // Ex: 18/04/25
  dateMedium: "DD/MM/YYYY", // Ex: 18/04/2025
  dateLong: "DD [de] MMMM [de] YYYY", // Ex: 18 de abril de 2025
  dateFull: "dddd, DD [de] MMMM [de] YYYY", // Ex: sexta-feira, 18 de abril de 2025

  usDateShort: "MM/DD/YY", // Ex: 04/18/25
  usDateMedium: "MM/DD/YYYY", // Ex: 04/18/2025
  enDateLong: "MMMM D, YYYY", // Ex: April 18, 2025
  enDateFull: "dddd, MMMM D, YYYY", // Ex: Friday, April 18, 2025

  dateTimeShort: "DD/MM/YY HH:mm", // Ex: 18/04/25 15:30
  dateTimeMedium: "DD/MM/YYYY [às] HH:mm", // Ex: 18/04/2025 às 15:30
  dateTimeLong: "DD [de] MMMM [de] YYYY [às] HH:mm", // Ex: 18 de abril de 2025 às 15:30
  enDateTimeLong: "MMMM D, YYYY h:mm A", // Ex: April 18, 2025 3:30 PM

  isoDate: "YYYY-MM-DD", // Ex: 2025-04-18
  isoDateTime: "YYYY-MM-DD[T]HH:mm:ssZ", // Ex: 2025-04-18T15:30:45-03:00
  rfc2822: "ddd, DD MMM YYYY HH:mm:ss ZZ", // Ex: Fri, 18 Apr 2025 15:30:45 -0300

  day: "DD", // Ex: 18
  dayName: "dddd", // Ex: sexta-feira
  dayMonth: "DD/MM", // Ex: 18/04
  dayMonthName: "DD [de] MMMM", // Ex: 18 de abril
  month: "MM", // Ex: 04
  monthNameShort: "MMM", // Ex: abr
  monthNameLong: "MMMM", // Ex: abril
  monthYear: "MMMM/YYYY", // Ex: abril/2025
  year: "YYYY", // Ex: 2025
  quarter: "Qo [trimestre]", // Ex: 2º trimestre
  weekOfYear: "Wo [semana]", // Ex: 16ª semana
} as const;

/**
 * Formata uma data de acordo com o estilo e fuso fornecidos.
 * @param inputDate - Date ou string ISO.
 * @param style - Estilo de formatação desejado.
 * @param tz - Fuso horário para ajuste (padrão DEFAULT_TIMEZONE).
 * @returns Valor formatado ou mensagem de erro.
 */
export function formatDateTime(
  inputDate?: Date | string,
  style: DateFormatStyle = "dateMedium",
  tz: string = DEFAULT_TIMEZONE
): string {
  if (!inputDate) return "Data não informada";

  const date = typeof inputDate === "string" ? dayjs.tz(inputDate, tz) : dayjs(inputDate).tz(tz);

  if (!date.isValid()) {
    return `Data inválida: ${inputDate}`;
  }

  // Para isoDateTime, usamos toISOString()
  if (style === "isoDateTime") {
    return date.toISOString();
  }

  // Formata e capitaliza
  const formatted = date.format(DATE_FORMATS[style]);
  return capitalize(formatted);
}

/**
 * Retorna o timestamp ISO 8601 da data/hora atual no fuso especificado.
 * @param tz - Fuso horário (padrão DEFAULT_TIMEZONE).
 * @returns Timestamp ISO 8601.
 */
export function getCurrentDateTimeISO(tz: string = DEFAULT_TIMEZONE): string {
  return dayjs().tz(tz).toISOString();
}
