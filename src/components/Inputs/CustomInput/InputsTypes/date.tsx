import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import React, { useCallback, useMemo, useRef } from "react";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import clsx from "clsx";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  clear?: () => void;
}

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

export const DateInput = ({ value, onChange, placeholder }: DateInputProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["60%"], []);

  const openModal = () => bottomSheetModalRef.current?.present();
  const closeModal = () => bottomSheetModalRef.current?.dismiss();

  const formatDisplay = (date: string) => {
    return date ? dayjs(date).format("DD/MM/YYYY") : "";
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} pressBehavior="close" />
    ),
    []
  );

  return (
    <>
      <TouchableOpacity className="flex-1 flex-row items-center justify-between px-1" onPress={openModal}>
        <Text className={clsx("flex-1 text-base", value ? "text-gray-900 dark:text-white" : "text-gray-500")}>
          {value ? formatDisplay(value) : placeholder || "Selecionar data"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDismissOnClose
        enableContentPanningGesture={false} // impede o gesto de arrastar o conteúdo
        enableHandlePanningGesture={false} // impede o gesto de arrastar pela alça
        backgroundStyle={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderColor: "#e5e7eb",
          borderWidth: 1,
        }}
      >
        <BottomSheetView>
          <Calendar
            onDayPress={(day: DateObject) => {
              onChange(day.dateString);
              closeModal();
            }}
            markedDates={{
              [value]: { selected: true, selectedColor: "#FF941A" },
            }}
          />
          <TouchableOpacity onPress={closeModal} className="bg-primary-light dark:bg-primary-dark py-3 mt-4">
            <Text className="text-white text-center font-semibold text-lg">Fechar</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
