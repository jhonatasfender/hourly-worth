interface Translation {
  app: {
    title: string;
    calculate: string;
  };
  form: {
    time: {
      label: string;
      placeholder: string;
      error: {
        required: string;
        format: string;
      };
    };
    currency: {
      label: string;
    };
    hourlyRate: {
      label: string;
      error: {
        required: string;
        format: string;
        positive: string;
      };
    };
  };
  result: {
    title: string;
    totalTime: string;
    totalValue: string;
    calculationDetails: string;
    hours: string;
    minutes: string;
    seconds: string;
    decimalHours: string;
    timeEquivalence: string;
  };
  timeUnits: {
    month: string;
    months: string;
    week: string;
    weeks: string;
    day: string;
    days: string;
    hour: string;
    hours: string;
  };
}

declare module '*.json' {
  const value: Translation;
  export default value;
} 