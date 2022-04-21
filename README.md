# Pseudo Random Number Simulator
![GitHub top language](https://img.shields.io/github/languages/top/ericjardon/PRNG)
![Lines of code](https://tokei.rs/b1/github/ericjardon/PRNG?category=code)

### Generation:
We wanted to be able to compare between some of the earlier computational methods for random number generation. Supported Generator Methods are:

1. Medios Cuadrados: _Middle Squares_
2. Método Congruencial : _Linear Congruential_
3. Método Conguencial Mixto + Validación de Teorema de Hull-Dobell : _Mixed Congruential_
4. Congruencial Lineal Combinado : _Combined Congruential_
5. Generador Multiplicativo : _Multplicative Congruential_

As a general rule, it is suggested to pick a Modulo (M) to be a power of two, and multiplier (A) to be an even power of two plus one, e.g. 5. The increment (C) is recommended to be a prime number. 
Both A and C should be integer values less than M.

### Validation:
For teaching purposes we implement a number of statistical tests to verify that the generated sample follows (or not) a Uniform Distribution.

Supported tests are:
1. Chi Squared test: splits the sample into classes and measures the proportion of Observed Frequencies versus Expected Frequencies of a uniform distribution.
2. Kolmogorov-Smirnov: estimates the maximum deviation between the expected Cumulative Distribution Function and the observed Cumulative Distribution function.

### Export your results to CSV!
When you're finished you can both export your sample to a csv file for further analysis as well as the generated table for both validation tests. These will be downloaded as `chi_test.csv` or `kol_test.csv` respectively.
