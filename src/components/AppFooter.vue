<template>
    <footer class="footer bg-dark">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
            integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />

        <div class="container-fluid">
            <div class="row">
                <div class="col-12 bg-dark footer-content">
                    <div class="text-white d-flex flex-row justify-content-around">
                        <div class="d-flex flex-column p-2">
                            <span class="footer-title">DELIVEBOO</span>
                            <router-link to="/about">Chi siamo</router-link>
                            <router-link to="/home">Ristoranti</router-link>
                            <span class="nav-item"><a href="http://127.0.0.1:8000/login">Accedi</a></span>
                            <span class="nav-item"><a href="http://localhost:8000/register">Registrati</a></span>
                        </div>

                        <div class="d-flex flex-column p-2">
                            <span class="footer-title">NOTE LEGALI</span>
                            <router-link to="/terms">Termini e condizioni</router-link>
                            <router-link to="/privacy">Informativa sulla privacy</router-link>
                            <router-link to="/cookies">Cookies</router-link>
                        </div>

                        <div class="d-flex flex-column p-2">
                            <span class="footer-title">HELP</span>
                            <router-link to="/FAQ">FAQ</router-link>
                            <router-link to="/contact">Contattaci</router-link>
                        </div>
                    </div>
                    <div class="social-icons">
                        <a href="#" aria-label="Facebook" class="social-icon"><i class="fab fa-facebook-f text-dark"></i></a>
                        <a href="#" aria-label="Twitter" class="social-icon"><i class="fab fa-twitter text-dark"></i></a>
                        <a href="#" aria-label="Instagram" class="social-icon"><i class="fab fa-instagram text-dark"></i></a>
                        <a href="#" aria-label="LinkedIn" class="social-icon"><i class="fab fa-linkedin-in text-dark"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "AppFooter",
    components: {},
}
</script>

<style scoped>
.footer {
    padding: 20px 0;
}

.footer-title {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 10px;
}

a {
    color: white;
    text-decoration: none;
    transition: color 0.3s, transform 0.3s;
}

a:hover {
    color: #ffcc00; 
    transform: scale(1.05);
}

.social-icons {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.social-icon {
    margin: 0 10px;
    font-size: 1.5rem;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px; 
    height: 40px; 
    border-radius: 50%; 
    background-color: rgb(248, 248, 248); 
}

.social-icons a:hover {
    color: #ffcc00; 
    background-color: rgb(255, 255, 255);
}


</style>