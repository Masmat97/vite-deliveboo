<!-- JS -->
<script>
export default {
    name: "AppAbout",
    data() {
        return {

        }

    }

}
</script>


<!-- HTML -->
<template>
    <div class="card">
        <col-6 class="p-4">
            <h5>About us</h5>
            <p>
                Siamo un gruppo di 5 amici appassionati di tecnologia e buon cibo, uniti dalla passione di creare
                qualcosa di innovativo e utile per la comunità. La nostra idea è quella di creare un'app di delivery di
                alimenti, simile a Deliveroo, che consenta agli utenti di ordinare i loro piatti preferiti da ristoranti
                locali e di riceverli comodamente a casa. Stiamo lavorando sodo per creare un'esperienza di acquisto
                semplice, veloce e sicura, con un'interfaccia utente intuitiva e facile da utilizzare. Il nostro
                obiettivo è quello di diventare il punto di riferimento per la consegna di alimenti nella nostra città,
                offrendo una gamma di opzioni di ristoranti e di piatti diversi per soddisfare ogni gusto e preferenza.
            </p>
        </col-6>
        <col-6 class="d-flex justify-content-center align-items-center m-0 p-4">
            <div class="card-img">
                <img src="https://as2.ftcdn.net/v2/jpg/03/16/12/51/1000_F_316125188_FYs3RbaUQ6gGwom3sfqSvgt2QGw3fKol.jpg"
                    alt="">
            </div>
        </col-6>
    </div>

</template>


<!-- CSS -->
<style scoped>
.card {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.card-img {
    width: 20rem;
    height: 20rem;
    object-fit: cover;
}

img {
    border-radius: 100%;
    width: 100%;

}
</style>
