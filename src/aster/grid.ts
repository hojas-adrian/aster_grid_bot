import { Aster } from "./aster.ts";

const aster = new Aster("ASTERUSDT");

interface GridConfig {
  high: number;
  low: number;
  gridCount: number;
}

export class gird {
  /**
   * Calcula los niveles de precio para una cuadrícula de trading
   * @param config Configuración con precio más alto, más bajo y número de divisiones
   * @returns Array de precios ordenados de mayor a menor
   */
  static calculateLevels({ high, low, gridCount }: GridConfig): number[] {
    if (high <= low) {
      throw new Error(
        "El precio más alto debe ser mayor que el precio más bajo"
      );
    }

    if (gridCount < 2) {
      throw new Error("El número de divisiones debe ser al menos 2");
    }

    const interval = (high - low) / (gridCount - 1);
    const levels: number[] = [];

    for (let i = 0; i < gridCount; i++) {
      const price = low + interval * i;
      // Redondear a 8 decimales para evitar errores de punto flotante
      levels.push(Number(price.toFixed(8)));
    }

    return levels;
  }

  static async getPrice(): Promise<number> {
    return await aster.getPrice();
  }

  static async testProfit(grid: number[]) {
    const request = await aster.getCommission();

    const commission = request.makerCommissionRate;

    return [
      ((grid[1] - grid[0] - (grid[0] + grid[1]) * +commission * 100) / 1) * 100,
      ((grid[grid.length - 1] -
        grid[grid.length - 2] -
        (grid[grid.length - 2] + grid[grid.length - 1]) * +commission * 100) /
        1) *
        100,
    ];
  }

  static pricetoAster(amount: number, price: number) {
    return amount / price;
  }

  static pricetoUsd(amount: number, price: number) {
    return amount * price;
  }

  // grid.forEach(async (level, i) => {
  //   const price = getPrice;

  //   price <= level
  //     ? await aster.buy(3, { price: level, id: i })
  //     : await aster.sell(3, { price: level, id: 1 });
  // });
}
