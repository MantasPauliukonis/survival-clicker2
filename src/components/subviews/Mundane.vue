<template>
  <div>
    <navigation @selectCategory="activeCategory = $event"
      default-category="jobs"
      :unseen-categories="unseenCategoryNames"
      :available-categories="availableCategoryNames">
    </navigation>
    <article :class="`category-${activeCategory}`">
      <template v-if="activeCategory == 'skills'">
        <span>Learning points: {{ learningPoints }}</span>
        <skill-action-group v-for="(group, groupName) of availableGroups"
          :category-name="activeCategory"
          :group-name="groupName"
          :key="groupName"
          :group="group">
        </skill-action-group>
      </template>
      <template v-else>
        <action-group v-for="(group, groupName) of availableGroups"
          :key="groupName"
          :group="group">
        </action-group>
      </template>
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { SerializedActions } from '@/store/actions';
import { SerializedStats } from '@/store/stats';
import ActionGroup from '@/components/layout/Actions/ActionGroup.vue';
import SkillActionGroup from '@/components/layout/Actions/Skills/SkillActionGroup.vue';
import Navigation from '@/components/layout/Navigation.vue';
import { pickBy } from '@/utils/method';

@Component({
  components: { ActionGroup, SkillActionGroup, Navigation },
})
export default class Mundane extends Vue {
  @Getter allActions!: SerializedActions;
  @Getter stats!: SerializedStats;

  activeCategory: 'jobs' | 'consumables' | 'drugs' | 'investment' = 'jobs';

  get availableCategoryNames() {
    if (this.allActions && this.allActions.mundane) {
      return Object.keys(this.allActions.mundane);
    }
  }

  get unseenCategoryNames(): string[] {
    const categoriesNames = [];

    if (this.allActions && this.allActions.mundane) {
      for (const [ categoryName, { hasUnseen } ] of Object.entries(this.allActions.mundane)) {
        if (hasUnseen) {
          categoriesNames.push(categoryName);
        }
      }
    }

    return categoriesNames;
  }

  get availableGroups() {
    if (!this.allActions || !this.allActions.mundane) {
      return;
    }

    const groups = this.allActions.mundane[this.activeCategory];

    return pickBy<{}>(groups, group => Object.keys(group).length);
  }

  get learningPoints() {
    return this.stats.skills.learningPoints.value;
  }
}
</script>

<style lang="scss" scoped>
  article {
    display: grid;
    grid-gap: 1rem;
    width: 50%;
  }
</style>
