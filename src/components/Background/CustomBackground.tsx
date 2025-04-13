import React from "react";
import { ImageBackground, ImageSourcePropType, StyleProp, ImageStyle, ViewStyle, Dimensions } from "react-native";

type Props = {
  source: ImageSourcePropType;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>; // Estilo do container
  imageStyle?: StyleProp<ImageStyle>; // Estilo específico para a imagem
};

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

// Estilos padrão
const defaultContainerStyle: ViewStyle = {
  width: WIDTH, // largura padrão
  height: HEIGHT, // altura padrão
};

const defaultImageStyle: ImageStyle = {
  resizeMode: "cover",
};

export function CustomBackground({ source, children, style, imageStyle }: Props) {
  return (
    <ImageBackground
      style={[defaultContainerStyle, style]} // Combina os estilos padrão com os passados pelo pai
      imageStyle={[defaultImageStyle, imageStyle]}
      source={source}
    >
      {children}
    </ImageBackground>
  );
}
