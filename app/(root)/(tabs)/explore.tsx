import { Link, router, useLocalSearchParams } from 'expo-router';
import {ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { useEffect } from 'react';

import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard } from '@/components/Cards';
import Filters from '@/components/Filters';
import { useGlobalContext } from '@/lib/global-provider';

import { useAppwrite } from '@/lib/useAppwrite';
import { getLatestProperties, getProperties } from '@/lib/appwrite';
import NoResults from '@/components/NoResults';


const Explore = () => {
   
  
    const params = useLocalSearchParams<{query?:string; filter?:string}>();

    const {data: properties, refetch, loading} = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 20,
        },
        skip: true
    })

    const handlePressCard = (id: string ) => router.push(`/properties/${id}`);

    useEffect(() => {
      refetch({
        filter: params.filter!,
        query: params.query!,
        limit: 20,
      })
    
    }, [params.filter, params.query])
    

  return (
    <SafeAreaView className="bg-white h-full">
        {/* <Button title='Seed' onPress={seed} /> */}
        <FlatList data={properties} 
        renderItem={({item})=> <Card item={item} onPress={() => handlePressCard(item.$id)} />  }
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName='flex gap-5  px-5'
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
            loading ? (
                <ActivityIndicator size="large" className='text-primary-300 mt-5' />
            ) : <NoResults />  
        }
        ListHeaderComponent={
            <View className='px-5'>
                <View className='flex flex-row items-center justify-between mt-5'>
                    <TouchableOpacity onPress={() => router.back()}  className='flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center'>
                        <Image source={icons.backArrow} className='size-5' />
                    </TouchableOpacity>

                        <Text className='text-base text-center font-rubik-medium text-black-300'>Search For your Ideal Home</Text>
                        <Image source={icons.bell} className='w-6 h-6 '/>

                </View>
                <Search />

                <View className='mt-5'>
                    <Filters />
                    <Text className='text-xl font-rubik-bold text-black-300 mt-5'>
                        Found {properties?.length || 0} {properties?.length === 1 ? 'property' : 'properties'}
                    </Text>
                </View>
            </View>
         }
        />

       
        
    </SafeAreaView>
  );
}
export default Explore
