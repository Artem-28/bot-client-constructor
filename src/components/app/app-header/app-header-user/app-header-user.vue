<template>
  <div class="app-header-user">
    <base-avatar :user="user" rounded />
    <div class="user-info">
      <div class="cursor-pointer">
        <span v-text="user.name" class="text-bold" />
        <q-menu :offset="[0, 34]">
          <div class="user-menu">
            <div
              v-for="item in userMenu"
              :key="item.code"
              v-close-popup
              class="user-menu__item"
              @click="clickItem(item)"
            >
              <q-icon :name="item.icon" color="primary" size="18px" />
              <span v-text="$t(item.label)" />
            </div>
          </div>
        </q-menu>
      </div>
      <span v-text="user.email" class="text-color--gray font-14" />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from 'src/stores';
import BaseAvatar from 'components/base/base-avatar/base-avatar';
import userMenu from 'components/app/app-header/app-header-user/app-header-user-menu';
import useApi from 'src/api';
import { useRouter } from 'vue-router';

// define[]

// Variables
const api = useApi();
const router = useRouter();

// Reactive variables
const { user } = useAuthStore();

// Composition

// Computed

// Watch

// Hooks

// Methods
async function logout() {
  try {
    await api.logout();
    await router.push('/login');
  } catch (e) {
    // something
  }
}
async function clickItem(item) {
  switch (item.code) {
    case 'logout':
      await logout();
      break;
    default:
      break;
  }
}
</script>

<style lang="scss" scoped>
.app-header-user {
  display: flex;
  gap: 16px;
  align-items: center;
}
.user-info {
  max-width: 220px;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  span {
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.user-menu {
  display: flex;
  flex-direction: column;
  min-width: 200px;
  &__item {
    cursor: pointer;
    transition: $default-transition;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 500;
    &:hover {
      background-color: $color-hover-primary;
    }
  }
}
</style>
