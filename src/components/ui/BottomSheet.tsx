import React, { useCallback } from 'react';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { colors } from '@/theme';
import { useTheme } from '@/hooks/useTheme';

interface Props {
  children: React.ReactNode;
  snapPoints?: string[] | number[];
  onClose?: () => void;
  index?: number;
}

export const AppBottomSheet = React.forwardRef<BottomSheet, Props>(({ children, snapPoints = ['25%', '50%', '90%'], onClose, index = -1 }, ref) => {
  const { mode } = useTheme();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      index={index}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: colors[mode].surface }}
      handleIndicatorStyle={{ backgroundColor: colors[mode].textSecondary }}
      onClose={onClose}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
});

AppBottomSheet.displayName = 'AppBottomSheet';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});
