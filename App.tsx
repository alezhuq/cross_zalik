import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    SafeAreaView,
    TextInput,
} from "react-native";
import Header from "./Header";
import { useState } from "react";
import calculateExp from "./experience";
interface worker {
    surname: string;
    enrollDate: Date;
    salary: number;
    workedHours: number;
}
export default function App() {
    const surnameValidation = (surname: string) => {
        if (surname.length > 3) {
            return true;
        } else {
            alert("Прізвище має бути довшим за 3 символи");
            return false;
        }
    };
    const dateValidation = (input: string) => {
        const pattern = /^\d{2}\.\d{2}\.\d{4}$/;

        if (pattern.test(input)) {
            const parts = input.split(".");
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);

            if (
                day >= 1 &&
                day <= 31 &&
                month >= 1 &&
                month <= 12 &&
                year >= 1900 &&
                year <= 2023
            ) {
                return true;
            } else {
                alert("Некоректна дата.");
                return false;
            }
        } else {
            alert("формат дати має бути таким : дд.мм.РРРР.");
            return false;
        }
    };
    const salaryValidation = (salary: number) => {
        if (isNaN(salary)) {
            alert("Salary must be int");
            return false;
        }
        if (salary <= 0) {
            alert("оплата має бути додатньою");
            return false;
        }
        return true;
    };
    const workedHoursValidation = (hours: number) => {
        if (isNaN(hours)) {
            alert("Година має бути числом");
            return false;
        }
        if (hours <= 0) {
            alert("Відпрацьовані години мають бути додатним числом");
            return false;
        }
        return true;
    };
    const [workers, setWorkers] = useState<worker[]>([]);
    const [surname, setSurname] = useState("");
    const [enrollDate, setEnrollDate] = useState("");
    const [salary, setSalary] = useState(0);
    const [workedHours, setWorkedHours] = useState(0);

    return (
        <SafeAreaView style={{ backgroundColor: "#7fc7af", flex: 1 }}>
            <ScrollView>
                <View>
                    <Header />
                    <Text style={{ ...styles.text, paddingTop: 20 }}>
                        Прізвище
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setSurname(text)}
                    ></TextInput>
                    <Text style={styles.text}>Дата зарахування</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setEnrollDate(text)}
                    ></TextInput>
                    <Text style={styles.text}>Погодинна оплата</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) =>
                            setSalary(parseInt(text))
                        }
                    ></TextInput>
                    <Text style={styles.text}>
                        Відпрацьовані години
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setWorkedHours(parseInt(text))}
                    ></TextInput>
                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? "#66a3ff"
                                    : "#ff3d7f",
                            },
                            styles.button,
                        ]}
                        onPress={() => {
                            if (
                                dateValidation(enrollDate) &&
                                surnameValidation(surname) &&
                                salaryValidation(salary) &&
                                workedHoursValidation(workedHours)
                            ) {
                                const date = enrollDate.split(".");

                                const day = parseInt(date[0]);
                                const month = parseInt(date[1]) - 1;
                                const year = parseInt(date[2]);
                                const newWorker: worker = {
                                    surname: surname,
                                    enrollDate: new Date(year, month, day),
                                    salary: salary,
                                    workedHours: workedHours,
                                };
                                setWorkers([...workers, newWorker]);
                            }
                        }}
                    >
                        <Text style={styles.text}>Click</Text>
                    </Pressable>
                    {workers.map((elem: worker, index: number) => {
                        return (
                            <View key={index}>
                                <Text style={styles.text}>
                                    Прізвище: {elem.surname}
                                </Text>
                                <Text style={styles.text}>
                                    Дата зарахування:{" "}
                                    {elem.enrollDate.getDate() +
                                        "." +
                                        (elem.enrollDate.getMonth() + 1) +
                                        "." +
                                        elem.enrollDate.getFullYear()}
                                </Text>
                                <Text style={styles.text}>
                                    Погодинна оплата:{" "}
                                    {elem.salary}
                                </Text>
                                <Text style={styles.text}>
                                    Відпрацьовані години:{" "}
                                    {elem.workedHours}
                                </Text>
                                <Text style={styles.text}>
                                    Стаж{" "}
                                    {calculateExp(elem.enrollDate) + " днів"}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        margin: 15,
        fontSize: 20,
        padding: 5,
    },
    container: {
        backgroundColor: "#7fc7af",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        lineHeight: 20,
        color: "black",
        fontWeight: "bold",
        letterSpacing: 0.25,
        fontSize: 20,
        alignSelf: "center",
    },
    button: {
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        paddingVertical: 12,
        alignSelf: "center",
        alignItems: "center",
        width: 130,
    },
    drop: {
        borderRadius: 12,
        borderWidth: 4,
        borderColor: "#82ccdd",
        height: 50,
    },
    placeholderStyles: {
        color: "grey",
    },
    drop1: {
        zIndex: 20,
        width: 200,
        marginHorizontal: 10,
        marginBottom: 15,
    },
    drop2: {
        zIndex: 10,
        width: 200,
        marginHorizontal: 10,
        marginBottom: 15,
    },
});
