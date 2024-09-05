<!-- JS -->
<script>
export default {
    name: "not_found",
    data() {
        return {

        }

    }

}
</script>


<!-- HTML -->
<template>
    >
    <p class="mt-5"><b>ERROR 404 PAGE NOT FOUND</b>
    </p>


    <div>
        <button>
            <router-link :to="{ name: 'RestaurantsCard' }" class="text-white">Torna a Restaurants</router-link>
        </button>

    </div>
</template>


<!-- CSS -->
<style scoped>
p {
    font-size: 5rem;
    padding: 2rem;
}

button {
    background-color: rgb(24, 55, 255);
}
</style>
