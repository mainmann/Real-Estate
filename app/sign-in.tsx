import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import icons from '@/constants/icons'
import images from '@/constants/images'
import { login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { Redirect } from 'expo-router'

const SignIn = () => {
    const { refetch, loading, isLoggedIn } = useGlobalContext();

    if (!loading && isLoggedIn) return <Redirect href="/" />;

    const handleLogin = async () => {
        const result = await login();

        if (result) {
            refetch({});
        } else {
            Alert.alert('Error', 'Login Failed');
        }
    };
    return (
        <SafeAreaView className='bg-white h-full'>
           <ScrollView contentContainerClassName='h-full'>
                <Image source={images.onboarding} className='h-4/6 w-full' resizeMode='contain' />
                <View className='px-10'>
                    <Text className='text-base text-center uppercase font-rubik text-black-200'>Welcome to Restao</Text>
                    <Text className='text-3xl font-rubik-bold text-black-300 text-center mt-2'>
                        Let's get you closer to{"\n"}
                        <Text className='text-primary-300 '>Your Ideal Home</Text>
                    </Text>
                    <Text className='text-lg font-rubik text-black-200 text-center mt-12'>Login with Restao</Text>
                    <TouchableOpacity onPress={handleLogin} className='bg-white shadow-md shadow-zinc-300 rounded-full mt-5 py-4 '>
                        <View className='flex flex-row items-center justify-center'>
                        <Image source={icons.google} className='w-5 h-5 ' resizeMode='contain' />
                        <Text className='text-base font-rubik-medium text-black-200 ml-3'>Continue with Google</Text>
                        </View>
                    
                    
                    </TouchableOpacity>
                </View>
           </ScrollView>
        </SafeAreaView>
    )
}
export default SignIn
