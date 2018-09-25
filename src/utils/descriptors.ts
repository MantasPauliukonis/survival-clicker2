export interface DecorateClassConstructor<Descriptors> {
  descriptorsOfProperties: Map<string, Descriptors>;
}

interface ClassWithConstructor {
  constructor: DecorateClassConstructor<any>;
}

export type DescriptorsMap<Descriptors> = Map<string, Descriptors>;

export function prepareDescriptorsOfProperty<DecorateClass extends ClassWithConstructor, Descriptors>(
  decorateClass: DecorateClass,
  propertyName: string,
  defaultDescriptors: Descriptors,
): DescriptorsMap<Descriptors> {
  const ctor = decorateClass.constructor as DecorateClassConstructor<Descriptors>;
  // Copying the variable so that it doesn't mutate the prototype class
  const descriptors = new Map(ctor.descriptorsOfProperties);

  if (!descriptors.has(propertyName)) {
    descriptors.set(propertyName, defaultDescriptors);
    // Forwarding the copy to the class
    ctor.descriptorsOfProperties = descriptors;
  }

  return descriptors;
}
