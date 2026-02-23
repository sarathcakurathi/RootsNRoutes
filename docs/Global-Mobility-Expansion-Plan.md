# Global Mobility Expansion Plan

## Vision

The broader vision for the Roots & Routes platform (currently named The Homecoming Compass) is to evolve beyond **Repatriation** and become a holistic decision-making engine for all major international life transitions. 

The expanded platform will support individuals who are evaluating moves for:
1. **Education** (Students evaluating universities, costs, and cultural fit)
2. **Employment** (Professionals evaluating job offers, career growth, and taxation)
3. **Entrepreneurship** (Business owners evaluating market size, regulations, and startup visas)
4. **Long-term Settlement** (Families evaluating citizenship prospects, stability, and lifestyle)
5. **Repatriation** (The current module, returning to the home country)

## Architectural Strategy

To achieve this, the underlying codebase needs to transition from a single hardcoded path into a **dynamic, data-driven framework**. 

### 1. Unified Data Schema
Currently, categories are stored in a single object `CATEGORIES` in `categories.ts`. This will be refactored to support a registry of frameworks. Each framework will define its own groups and tracking parameters:

```typescript
type Framework = {
  id: string; // e.g., 'education', 'repatriation'
  title: string;
  description: string;
  tabs: string[]; // e.g., ['Self', 'Kids', 'Dependents'] or ['Academic', 'Financial']
  categories: {
    [tabName: string]: {
      id: string;
      group: string;
      label: string;
      description: string;
    }[]
  }
}
```

### 2. State Management & Navigation
- **Landing Screen**: A new initial screen will be introduced where users select their primary objective (Education, Employment, etc.). 
- **Dynamic Routing**: The `App.tsx` state will need to track the `selectedFramework`.
- **Form Adaptation**: `EvaluationForm.tsx` and `PersonalDetailsForm.tsx` will become configurable components that render different fields depending on the active framework. For instance, a student might not need a "Kids" or "Dependents" tab, but rather "University Profile".

### 3. Component Reusability
The UI components (glassmorphism panels, step indicators, sliders, and navigation buttons) are beautifully designed and fully reusable. We will extract them into a `components/ui/` folder so they can be easily imported across different framework pages without code duplication.

## Implementation Phases

### Phase 1: Structural Refactoring (Preparation)
- Define the generic JSON structure for the decision matrices.
- Refactor existing `categories.ts` to implement this new JSON structure under a `repatriation` key.
- Update `EvaluationForm.tsx` to read dynamically from the new structure rather than a hardcoded constant.
- Ensure the Excel export utility adapts dynamically to any given framework structure without hardcoded cell mapping.

### Phase 2: Platform expansion
- Create the **Framework Selection** landing screen.
- Move the current "Personal Details" and "Evaluation" steps behind the framework selection router.
- Draft and plug in the configuration JSON for the **Education** pathway (e.g., University Ranking, Cost of Living, Post-study Work Visa, Course Relevance).
- Draft and plug in the configuration JSON for the **Employment** pathway (e.g., Salary Competitiveness, Industry Growth, Work Culture, Taxation).

### Phase 3: Specialized Pathways & Content
- Draft and plug in the configuration JSON for the **Entrepreneurship** pathway.
- Draft and plug in the configuration JSON for the **Settlement** pathway.
- Implement conditional branching (e.g., if a user selects Employment, ask if they are moving alone or with family to dynamically show/hide tabs).

## Future Possibilities
- **AI-Powered Insights**: Integrating an AI layer to analyze the user's sliders and challenges to provide tailored advice or resources (e.g., "We notice you rated Healthcare as highly important but currently score it low; here are top countries for expatriate healthcare").
- **Saved Profiles**: Allowing users to create accounts to save and compare multiple different scenarios (e.g., "Moving to Canada for Work" vs "Moving to Germany for Work").
