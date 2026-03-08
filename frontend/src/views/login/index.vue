<template>
    <div class="login-wrapper d-flex flex-column justify-center align-center text-center">
        <h1 class="title">DigitalTWINS AI Portal</h1>
        <h1> </h1>
        <v-btn
            class="keycloak-btn mt-8"
            color="primary"
            size="large"
            :loading="loading"
            @click="handleKeycloakLogin"
        >
            Login with Keycloak
        </v-btn>
        <p v-if="errorMessage" class="error-message mt-4">{{ errorMessage }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth_store';
import {
    getKeycloak,
    isAuthenticated as checkAuthenticated,
    consumePostLogoutRedirectPath,
    getPostLogoutRedirectPath,
} from '@/plugins/keycloak';

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(false);
const errorMessage = ref('');

onMounted(async () => {
    if (checkAuthenticated()) {
        const returnPath = consumePostLogoutRedirectPath();
        await router.replace(returnPath || '/home');
        return;
    }

    authStore.updateAuthState();
});

const handleKeycloakLogin = async () => {
    loading.value = true;
    errorMessage.value = '';
    const keycloak = getKeycloak();

    if (keycloak) {
        try {
            const returnPath = getPostLogoutRedirectPath();
            await keycloak.login({
                redirectUri: window.location.origin + returnPath
            });
        } catch (error) {
            console.error('Keycloak login failed:', error);
            errorMessage.value = 'Keycloak login failed. Please try again.';
            loading.value = false;
        }
    } else {
        errorMessage.value = 'Keycloak is not initialized. Please refresh the page.';
        loading.value = false;
    }
};

</script>

<style scoped>
.login-wrapper {
  min-height: 320px;
  min-width: 320px;
}

.title {
  line-height: 1.3;
  font-size: 2.6rem;
}

.keycloak-btn {
  min-width: 220px;
  font-weight: 600;
  text-transform: none;
}

.error-message {
    opacity: 0.95;
}
</style>

