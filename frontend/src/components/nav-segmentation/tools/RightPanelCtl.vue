<template>
  <div>
    <Switcher
      :title="'Breast Model'"
      :label="switchBreastLabel"
      :disabled="breastModelDisabled"
      v-model:controller="breastModelState"
      @toggleUpdate="toggleBreast"
    />
  </div>
</template>

<script setup lang="ts">
import Switcher from "@/components/commonBar/Switcher.vue";
import { ref, onMounted, onUnmounted } from "vue";
import emitter from "@/plugins/custom-emitter";

const breastModelState = ref(true);
const breastModelDisabled = ref(true)
const switchBreastLabel = ref("show");


onMounted(() => {
  manageEmitters();
});

function manageEmitters() {
  emitter.on("Segmentation:FinishLoadAllCaseImages", emitterOnFinishLoadAllCaseImages)
}

const emitterOnFinishLoadAllCaseImages = () => {
  breastModelDisabled.value = false;
}

function toggleBreast(value: boolean) {
  switchBreastLabel.value = switchBreastLabel.value === "show" ? "hide" : "show";
  emitter.emit("Common:ToggleBreastVisibility", value);
}

onUnmounted(() => {
  emitter.off("Segmentation:FinishLoadAllCaseImages", emitterOnFinishLoadAllCaseImages)
})
</script>

<style scoped></style>
  