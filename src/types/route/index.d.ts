export type Route = {
  name: string;
  title: string;
};

export type TabRoute = Route & {
  tabBarIcon: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => Element;
  icon: ReactNode;
};
