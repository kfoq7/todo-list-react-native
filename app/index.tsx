import { useState } from "react";
import {
  // Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Task } from "@/components/Task";

export default function Home() {
  const [task, setTask] = useState<string | null>(null);
  const [taskItems, setTaskItems] = useState<string[]>([]);

  const handleAddTask = () => {
    // Keyboard.dismiss();
    setTaskItems((prevItems) => {
      if (!task) return prevItems;

      return [...prevItems, task];
    });
    setTask(null);
  };

  const completeTask = (index: number) => {
    const itemsCopied = [...taskItems];
    itemsCopied.splice(index, 1);
    setTaskItems(itemsCopied);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {taskItems.map((text, index) => (
            <TouchableOpacity key={text} onPress={() => completeTask(index)}>
              <Task text={text} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a Task"
          value={task ?? ""}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8EAED",
    flex: 1,
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
