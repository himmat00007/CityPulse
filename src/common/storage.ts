import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
    name: string;
    email: string;
};

export async function saveUser(user: User) {
    await AsyncStorage.setItem('user', JSON.stringify(user));
}

export async function getUser(): Promise<User | null> {
    const data = await AsyncStorage.getItem('user');
    return data ? (JSON.parse(data) as User) : null;
}
