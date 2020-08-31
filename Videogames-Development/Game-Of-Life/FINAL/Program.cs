using System;
using System.Threading;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;


namespace GameOfLife
{
    class Program
    {
        const int FILAS = 20, COLUMNAS = 60;

        //MOSTRAR TABLEROS
        static void MostrarTablero(int[,] tablero)
        {
            for (int i = 0; i < tablero.GetLength(0); i++)
            {
                for (int j = 0; j < tablero.GetLength(1); j++)
                {
                    switch (tablero[i, j])
                    {
                        case 0:
                            Console.ForegroundColor = ConsoleColor.Black;
                            Console.Write(" ■");
                            break;
                        case 1:
                            Console.ForegroundColor = ConsoleColor.Green;
                            Console.Write(" ■");
                            break;
                    }

                }
                Console.WriteLine();
            }
            Console.ResetColor();
        }
        //FIN MOSTRAR TABLEROS



        //CARGAS DE TABLEROS
        static void CargarPredeterminado(ref int[,] tablero)
        {
            tablero[9, 29] = 1;
            tablero[9, 30] = 1;
            tablero[10, 30] = 1;
            tablero[11, 30] = 1;
            tablero[10, 31] = 1;

            MostrarTablero(tablero);
        }


        static void CargarManual(ref int[,] tablero)
        {
            int i, j = 0;
            Console.WriteLine("Ingrese a continuacion las posiciones donde se encontraran las celulas vivas. Al terminar, presione -1");
            do
            {
                i = NumeroIngresado("fila", 1, FILAS) - 1;
                if (i != -1)
                {
                    j = NumeroIngresado("columna", 1, COLUMNAS) - 1;
                    if (j != -1)
                    {
                        tablero[i, j] = 1;
                    }
                }
            } while (i != -1 && j != -1);
            Console.Clear();
            MostrarTablero(tablero);

        }
        //EXTRA DE CARGA MANUAL
        static int NumeroIngresado(string pedido, int min, int max)
        {
            int num;
            Console.Write("\nIngrese la " + pedido + " donde quiere colocar la celula: ");
            num = Convert.ToInt32(Console.ReadLine());
            if (num == -1)
            {
                return -1 + 1;
            }

            while (num < min || num > max)
            {
                Console.Write("\nFuera de rango, reingrese: ");
                num = Convert.ToInt32(Console.ReadLine());
            }
            return num;
        }
        //FIN EXTRA

        static void CargaAleatoria(ref int[,] tablero)
        {
            int casillero = 0;
            int posicion;
            int fila, columna;
            Random rdm = new Random();
            do
            {
                posicion = rdm.Next(2);
                fila = rdm.Next(tablero.GetLength(0));
                columna = rdm.Next(tablero.GetLength(1));
                tablero[fila, columna] = posicion;
                casillero++;

            } while (casillero != tablero.Length);

            MostrarTablero(tablero);
        }

        //MANEJO DEARCHIVOS
        static void GuardarMatriz(int[,] matriz)
        {
            string nombreArchivo = "GameOfLife.txt";

            FileStream file = new FileStream(nombreArchivo, FileMode.Create, FileAccess.Write);
            StreamWriter sw = new StreamWriter(file);

            sw.WriteLine(matriz.GetLength(0) + "," + matriz.GetLength(1));
            for (int i = 0; i < matriz.GetLength(0); i++)
            {
                for (int j = 0; j < matriz.GetLength(1); j++)
                {
                    sw.Write(matriz[i, j]);
                    if (j != matriz.GetLength(1) - 1)
                    {
                        sw.Write(",");
                    }
                }
                sw.WriteLine();
            }
            Console.WriteLine("Guardado exitoso!");
            sw.Close();
            file.Close();
        }

        static void CargarArchivo(ref int[,] tablero)
        {
            string nombreArchivo = "GameOfLife.txt";
            if (File.Exists(nombreArchivo))
            {
                FileStream file = new FileStream(nombreArchivo, FileMode.Open, FileAccess.Read);
                StreamReader sr = new StreamReader(file);

                char[] separadores = { ',', ';', '-', '|' };
                string[] linea;
                int fila, col;
                linea = sr.ReadLine().Split(separadores);
                fila = Convert.ToInt32(linea[0]);
                col = Int32.Parse(linea[1]);
                int[,] matriz = new int[fila, col];
                for (int i = 0; i < fila; i++)
                {
                    linea = sr.ReadLine().Split(separadores);
                    for (int j = 0; j < col; j++)
                    {
                        matriz[i, j] = Convert.ToInt32(linea[j]);
                    }
                }
                sr.Close();
                file.Close();
                
                tablero = matriz;

                MostrarTablero(tablero);
            }
            else
            {
                Console.WriteLine("Lo siento, no se ha encontrado una partida gurdada. A continuacion se le cargara un tablero predeterminado.");
                CargarPredeterminado(ref tablero);
                
            }
        }
        //FIN DE MANEJOS DE ARCHIVOS

        //FIN CARGAS DE TABLEROS


        //REGLAS
        static void Reglas(int[,] tablero, int[,] actualizarTablero, int i, int j, int cantVecinos, ref int nacimientos, ref int muertes)
        {
            if (tablero[i, j] == 0 && cantVecinos == 3)
            {
                actualizarTablero[i, j] = 1;
                nacimientos++;
            }
            else
            {
                if (tablero[i, j] == 1 && (cantVecinos < 2 || cantVecinos > 3))
                {
                    actualizarTablero[i, j] = 0;
                    muertes++;
                }
                else
                {
                    actualizarTablero[i, j] = tablero[i, j];
                }

            }
        }
        //FIN REGLAS

        //VECINOS
        static int Vecinos(int[,] tablero, int x, int y, ref int cantVecinos)
        {
            for (int i = 0; i < 3; i++)
            {

                for (int j = 0; j < 3; j++)
                {
                    int columna = (x + (i - 1) + tablero.GetLength(0)) % tablero.GetLength(0);
                    int fila = (y + (j - 1) + tablero.GetLength(1)) % tablero.GetLength(1);
                    cantVecinos += tablero[columna, fila];
                }
            }
            cantVecinos -= tablero[x, y];
            return cantVecinos;
        }
        //FIN VECINOS



        //INICIO JUEGO
        static void Juego(ref int[,] tablero, ref int nacimientos, ref int muertes, ref int[,] celulasCongeladas)
        {

            int cantVecinos = 0;
            int[,] actualizarTablero = new int[FILAS, COLUMNAS];

            for (int i = 0; i < tablero.GetLength(0); i++)
            {

                for (int j = 0; j < tablero.GetLength(1); j++)
                {
                    Vecinos(tablero, i, j, ref cantVecinos);

                    Reglas(tablero, actualizarTablero, i, j, cantVecinos, ref nacimientos, ref muertes);

                    cantVecinos = 0;
                }
            }

            CelulasCongeladas(tablero, actualizarTablero, ref celulasCongeladas);

            tablero = actualizarTablero;

            MostrarTablero(tablero);

        }
        //FIN JUEGO

        //CELULAS
        static void Celulas(int[,] tablero)
        {
            int celulasVivas = 0, celulasMuertas = 0;

            for (int i = 0; i < tablero.GetLength(0); i++)
            {
                for (int j = 0; j < tablero.GetLength(1); j++)
                {
                    if (tablero[i, j] == 1)
                    {
                        celulasVivas++;

                    }
                    else
                    {
                        celulasMuertas++;

                    }

                }
            }

            Console.WriteLine("El numero de celulas vivas son: " + celulasVivas + "\nEl numero de celulas muertas son: " + celulasMuertas);

        }

        static void CelulasCongeladas(int[,] tablero, int[,] actualizarTablero, ref int[,] celulasCongeladas)
        {
            for (int i = 0; i < tablero.GetLength(0); i++)
            {
                for (int j = 0; j < tablero.GetLength(1); j++)
                {
                    if (tablero[i, j] == 1 && tablero[i, j] == actualizarTablero[i, j])
                    {
                        celulasCongeladas[i, j] = tablero[i, j];
                    }
                    else
                    {
                        celulasCongeladas[i, j] = -1;
                    }

                }
            }
        }


        //FIN CELULAS
        //DATOS
        static void Datos(int[,] tablero, int turnosEjecutados, int nacimientos, int muertes, int[,] celulasCongeladas)
        {
            Console.WriteLine("");
            Console.WriteLine("Turno realizados: " + turnosEjecutados);
            Console.WriteLine("El numero de celulas que nacieron: " + nacimientos + "\nEl numero de celulas que murieron: " + muertes);
            Console.WriteLine();
            Console.WriteLine("Las posiciones: ");
            for (int i = 0; i < celulasCongeladas.GetLength(0); i++)
            {
                for (int j = 0; j < celulasCongeladas.GetLength(1); j++)
                {
                    if (celulasCongeladas[i, j] == -1)
                    {

                    }
                    else
                    {
                        Console.Write((i + 1) + ", " + (j + 1) + " | ");
                    }

                }
            }
            Console.WriteLine();
            Console.WriteLine("se ha mantenido igual durante dos turnos seguidos");
            Console.WriteLine();
        }
        //FIN DATOS




        static void Main(string[] args)
        {
            //VARIABLES
            int nacimientos = 0, muertes = 0;
            bool salir = false;
            int turnosEjecutados = 0;
            int[,] tablero = new int[FILAS, COLUMNAS];
            int[,] celulasCongeladas = new int[FILAS, COLUMNAS];
            //FIN DECLARACIONES

            Console.WriteLine("Bienvenido al juego de la vida");
            //ELECCION DE OPCION
            Console.WriteLine("Elegi una de las siguientes opciones: \n1) Cargar la configuracion inicial de forma manual\n2) Cargar una configuracion aleatoria con X celulas vivas\n3) Cargar configuracion predeterminada\n4) Seguir con la partida gurdada.");

            //FIN DE ELECCION
            //ELEGIR FUNCION A PARTIR DE ELECCION

            ConsoleKeyInfo eleccion;
            eleccion = Console.ReadKey(true);
            switch (eleccion.Key)
            {
                case ConsoleKey.NumPad1:
                    CargarManual(ref tablero);
                    break;
                case ConsoleKey.NumPad2:
                    CargaAleatoria(ref tablero);
                    break;
                case ConsoleKey.NumPad3:
                    CargarPredeterminado(ref tablero);
                    break;
                case ConsoleKey.NumPad4:
                    CargarArchivo(ref tablero);
                    break;
                default:
                    CargarPredeterminado(ref tablero);
                    break;
            }

            //FIN DEL SWITCH

            Console.WriteLine("Pulse -tecla space- para correr turno\nPulse tecla 'X' para correr turnos deseados\nPulse -tecla enter- para cerrar y guardar la aplicacion\nPulse -tela esc- para sali sin guardar");


            do
            {
                ConsoleKeyInfo tecla;
                tecla = Console.ReadKey(true);

                switch (tecla.Key)
                {
                    case ConsoleKey.Spacebar:
                        Juego(ref tablero, ref nacimientos, ref muertes, ref celulasCongeladas);
                        break;
                    case ConsoleKey.X:
                        Console.WriteLine("Cuantos turnos desea simular?");
                        int turnosSimulados = Convert.ToInt32(Console.ReadLine());
                        while (turnosSimulados != 0)
                        {
                            turnosSimulados--;
                            turnosEjecutados++;
                            Console.Clear();
                            Juego(ref tablero, ref nacimientos, ref muertes, ref celulasCongeladas);
                            Thread.Sleep(500);
                        }
                        break;
                    case ConsoleKey.Enter:
                        GuardarMatriz(tablero);
                        Thread.Sleep(2000);
                        salir = true;
                        break;
                    case ConsoleKey.Escape:
                        salir = true;
                        break;
                    default:
                        Juego(ref tablero, ref nacimientos, ref muertes, ref celulasCongeladas);
                        break;
                }


                turnosEjecutados++;

                //INICIO DATOS
                if (salir == false)
                {
                    Datos(tablero, turnosEjecutados, nacimientos, muertes, celulasCongeladas);
                    Celulas(tablero);
                }
                //SE DEBE ACLARAR SI HAY ALGUN ESPACIO CELULAR QUE SE CONGELO
                //FIN DE DATOS

                //Console.ReadKey();

            } while (salir == false);
            //Console.ReadKey();
        }
    }
}

