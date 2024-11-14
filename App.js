import { CameraView, CameraType, useCameraPermissions } from "expo-camera"
import { useState } from "react"
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  SafeAreaViewComponent,
  TextInput,
} from "react-native"

export default function App() {
  const [facing, setFacing] = useState("back")
  const [permission, requestPermission] = useCameraPermissions()
  const [cameraActive, setCameraActive] = useState()
  const [scannedBarcode, setScannedBarcode] = useState()

  if (!permission) {
    // Camera permissions are still loading.
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>

        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"))
  }

  if (!cameraActive)
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TextInput style={styles.input} value={scannedBarcode} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setCameraActive(true)
            }}
          >
            <Text style={styles.text}>Start Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    )

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={(scannedBarcode) => {
          console.log(scannedBarcode.data)
          setScannedBarcode(scannedBarcode.data)
          setCameraActive(false)
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  barcode: {
    flex: 1,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "red",
    fontSize: 30,
    borderColor: "red",
  },
})
