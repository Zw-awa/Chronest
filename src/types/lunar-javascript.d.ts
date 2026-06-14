declare module "lunar-javascript" {
  export class Solar {
    static fromYmd(year: number, month: number, day: number): Solar;
    getLunar(): Lunar;
  }

  export class Lunar {
    getDay(): number;
    getDayInChinese(): string;
    getMonthInChinese(): string;
    getJieQi(): string;
    getFestivals(): string[];
    getOtherFestivals(): string[];
  }
}
