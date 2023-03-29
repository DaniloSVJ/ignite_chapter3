import { container } from "tsyringe";
import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./implementetions/DayjsDateProvider";


container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)