import { images } from "@/constants/images";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchPopularMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchPopularMovies({ query: "" }));

  if (moviesLoading || trendingLoading) {
    return (
      <View className="flex-1 bg-primary">
        <Image source={images.background} className="absolute z-0" />
        <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
      </View>
    );
  }

  if (moviesError || trendingError) {
    return (
      <View className="flex-1 bg-primary px-5">
        <Image source={images.background} className="absolute z-0" />
        <Text className="text-white mt-10">Error: {moviesError?.message || trendingError?.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.background} className="absolute z-0" />

      <FlatList
        data={movies ?? []}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        className="px-5"
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Image source={images.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mt-5 mb-3">Trending Movies</Text>
              </View>
            )}

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-4" />}
              className="mb-4 mt-3"
              data={trendingMovies}
              renderItem={({ item, index }) => (
                <TrendingCard movie={item} index={index} />
              )}
              keyExtractor={(item) => item.movie_id.toString()}
            />

            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>

          </View>
        }
        renderItem={({ item }) => (
          <MovieCard
            {...item}
          />
        )}
      />
    </View>
  );
}
