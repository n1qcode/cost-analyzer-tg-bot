import Calculator from "../Calculator";

const additionData = [
  {
    describe: "addition with integer numbers",
    input: "10 + 8 + 111 + 64 + 0",
    output: 193,
  },
  {
    describe: "addition with float numbers with a dot",
    input: "4.4 + 170.06 + 99.01 + 31.09 + 54.55 + 0.0 + 0.00",
    output: 359.11,
  },
  {
    describe: "addition with float numbers with a comma",
    input: "4,4 + 170,06 + 99,01 + 31,09 + 54,55 + 0,0 +0,00",
    output: 359.11,
  },
  {
    describe: "addition with float numbers with mix char",
    input: "4,4 + 170.06 + 99,01 + 31.09 + 54,55 + 0,0 + 0.00",
    output: 359.11,
  },
  {
    describe: "addition with mix numbers type",
    input: "4,4 + 170 + 99 + 31.09 + 54,55 + 8 + 0 + 0,01",
    output: 367.05,
  },
  {
    describe: "addition with float numbers no white space",
    input: "4,4+170+99+31.09+54,55+8+0",
    output: 367.04,
  },
  {
    describe: "addition with only two int numbers",
    input: "4+5",
    output: 9,
  },
  {
    describe: "addition with only two float numbers",
    input: "4.99+5,01",
    output: 10,
  },
];
const subtractionData = [
  {
    describe: "subtraction with integer numbers",
    input: "1023 - 10 - 90 - 311 - 1 - 0 - 9 - 10",
    output: 592,
  },
  {
    describe: "subtraction with float numbers with a dot",
    input: "1023.99 - 10.08 - 90.7 - 311.01 - 1.01 - 9.99 - 10.09",
    output: 591.11,
  },
  {
    describe: "subtraction with float numbers with a comma",
    input: "1023,99 - 10,08 - 90,7 - 311,01 - 1,01 - 9,99 - 10,09",
    output: 591.11,
  },
  {
    describe: "subtraction with float numbers with mix char",
    input: "1023,99 - 10.08 - 90.7 - 311,01 - 1.01 - 9.99 - 10,09",
    output: 591.11,
  },
  {
    describe: "subtraction with mix numbers type",
    input: "1023,99 - 10 - 90.7 - 311 - 1 - 9.99 - 10,09",
    output: 591.21,
  },
  {
    describe: "subtraction with float numbers no white space",
    input: "1023,99-10.08-90.7-311,01-1.01-9.99-10,09",
    output: 591.11,
  },
  {
    describe: "subtraction with only two int numbers",
    input: "123-24",
    output: 99,
  },
  {
    describe: "subtraction with only two float numbers",
    input: "123,01-24.56",
    output: 98.45,
  },
];
const addAndSubData = [
  {
    describe: "add and sub with integer numbers",
    input: "10 - 8 + 111 - 64 - 0",
    output: 49,
  },
  {
    describe: "add and sub with float numbers with a dot",
    input: "4.4 - 170.06 + 99.01 - 31.09 + 54.55 - 0.0 - 0.00 + 99.99",
    output: 56.8,
  },
  {
    describe: "add and sub with float numbers with a comma",
    input: "4,4 - 170,06 + 99,01 - 31,09 + 54,55 - 0,0 +0,00 + 99.99",
    output: 56.8,
  },
  {
    describe: "add and sub with float numbers with mix char",
    input: "4,4 + 170.06 - 99,01 + 31.09 - 54,55 + 0,0 - 0.00 + 99.99",
    output: 151.98,
  },
  {
    describe: "add and sub with mix numbers type",
    input: "4,4 + 170 + 99 - 31.09 + 54,55 - 8 + 0 + 0,01 + 99.99",
    output: 388.86,
  },
  {
    describe: "add and sub with float numbers no white space + 99.99",
    input: "4,4+170+99-31.09+54,55-8+0",
    output: 288.86,
  },
  {
    describe: "add and sub with only three int numbers",
    input: "4+5-6",
    output: 3,
  },
  {
    describe: "add and sub with only three float numbers",
    input: "4.99+5,01-6,5",
    output: 3.5,
  },
];
const multiplicationData = [
  {
    describe: "multiplication with integer numbers",
    input: "10 * 8 * 111 * 5",
    output: 44400,
  },
  {
    describe: "multiplication with float numbers with a dot",
    input: "4.4 * 20.99 * 3.01 * 9.96",
    output: 2768.8,
  },
  {
    describe: "multiplication with float numbers with a comma",
    input: "4,4 * 20,99 * 3,01 * 9,96",
    output: 2768.8,
  },
  {
    describe: "multiplication with float numbers with mix char",
    input: "4.4 * 20,99 * 3.01 * 9,96",
    output: 2768.8,
  },
  {
    describe: "multiplication with mix numbers type",
    input: "5 * 4.4 * 2 * 20,99 * 3.01 * 10 * 9,96 * 1",
    output: 276879.59,
  },
  {
    describe: "multiplication with float numbers no white space",
    input: "5*4.4*2*20,99*3.01*10*9,96*1",
    output: 276879.59,
  },
  {
    describe: "multiplication with only two int numbers",
    input: "4*5",
    output: 20,
  },
  {
    describe: "multiplication with only two float numbers",
    input: "4.99*5,01",
    output: 25,
  },
];
const mixOperationData = [
  {
    describe: "addition (on the sides) with integer numbers",
    input: "10 + 1+ 45 * 3 + 56 - 31 + 70*4 + 16 + 35 - 80*2 +3 + 5",
    output: 350,
  },
  {
    describe: "addition (on the sides) with float numbers",
    input:
      "10.01 + 11,09 + 45,03 * 3.11 - 5 + 3 + 70,16*4.07 + 16 - 35 + 80,23*2 + 64,03 + 4.99",
    output: 655.17,
  },
  {
    describe: "long addition (on the sides) with float numbers",
    input:
      "0.00 + 31,5 + 10.01 + 11,09 + 45,03 * 3.11 - 5 + 3 + 70,16*4.07 + 16 - 35 + 80,23*2 + 64,03 + 0 + 4.99 + 11.01+0.0",
    output: 697.68,
  },
  {
    describe: "subtraction (on the sides) with integer numbers",
    input: "140 - 1- 45 * 3 + 56 - 31 + 70*4 + 16 + 35 - 80*2 -3 - 5",
    output: 192,
  },
  {
    describe: "subtraction (on the sides) with float numbers",
    input:
      "110.01 - 11,09 - 45,03 * 3.11 - 5 + 3 + 70,16*4.07 + 16 - 35 + 80,23*2 - 64,03 - 4.99",
    output: 314.87,
  },
  {
    describe: "long subtraction (on the sides) with float numbers",
    input:
      "0.00 - 31,5 - 10.01 - 11,09 - 45,03 * 3.11 - 5 + 3 + 70,16*4.07 + 16 - 35 + 80,23*2 - 64,03 - 0 - 4.99 - 11.01-0.0",
    output: 152.34,
  },
  {
    describe: "multiplication (on the sides) with integer numbers",
    input: "45 * 3 - 5 + 3 + 70*4 + 16 + 35 - 80*2",
    output: 304,
  },
  {
    describe: "multiplication (on the sides) with float numbers",
    input: "45.31 * 3,99 + 5.6 - 3,1 + 70.99*4,89 + 16,44 - 35 + 80,01*2",
    output: 671.89,
  },
  {
    describe: "multiplication (on the sides) with zero suffix",
    input: "45.00 * 3,00 -5.0 + 3,0 + 70.00*4,00 + 16,00 + 35 - 80,00*2",
    output: 304,
  },
  {
    describe: "long multiplication (on the sides) with zero suffix",
    input:
      "1,00 * 3,91 * 45.00 * 3,00 + 5.0 - 3,0 - 70.00*4,00 - 16,00 + 35 + 80,00*2 * 1.09 * 5.80",
    output: 1280.37,
  },
  {
    describe: "mix with negative numbers",
    input: "45.01 * -3,1 + -5.6 - 3,1 + -70*4 + -16,99 - 35,43 + -80,05*2",
    output: 0,
  },
];
const edgeCasesData = [
  {
    describe: "just one integer number",
    input: "8",
    output: 8,
  },
  {
    describe: "just one float number with dot divider",
    input: "8.88",
    output: 8.88,
  },
  {
    describe: "just one float number with float divider",
    input: "301,99",
    output: 301.99,
  },
  {
    describe: "just zero",
    input: "0",
    output: 0,
  },
  {
    describe: "negative int number",
    input: "-44",
    output: 0,
  },
  {
    describe: "negative float number",
    input: "-44.99",
    output: 0,
  },
  {
    describe: "empty",
    input: "",
    output: 0,
  },
  {
    describe: "calc max big numbers",
    input: "12345678,99 + 12345678.99 * 1",
    output: 24691357.98,
  },
  {
    describe: "calc too big numbers",
    input: "123456789,99 + 123456789.99 * 1",
    output: 0,
  },
  {
    describe: "not allowed chars ()",
    input:
      "2.5 * (4.5 + 6.5) + 8.5 + 10.5 * 12.5 + 14.5 + 16.5 + 18.5 * 20.5 + 22.5 + 24.5 + 26.5 + 28.5 + 30.5",
    output: 0,
  },
  {
    describe: "incorrect 1",
    input:
      "2. 5 * 4.5 + 6,5 + 8.5 + 10.5 * 12,5 + 14.5 - 16,5 + 18,5 * 20.5 + 22.5 + 24,5 + 26.5 + 28,5 + 30.5",
    output: 0,
  },
  {
    describe: "incorrect 2",
    input:
      "2.5 * 4.5 + 6,5 + 8.5 + 10.5 * 12,5 + 14.,5 + 16,5 + 18,5 * 20.5 + 22.5 - 24,5 + 26.5 + 28,5 + 30.5",
    output: 0,
  },
  {
    describe: "incorrect 3",
    input:
      "2.5 * 4.5 + 6,5 + 8.5 + 10.5 * 12, 5 - 14.5 + 16,5 + 18,5 * 20.5 + 22.5 + 24,5 + 26.5 + 28,5 + 30.5",
    output: 0,
  },
  {
    describe: "incorrect 4",
    input:
      "2.5 * 4.5 + 6,5 + 8.5 + 10.5 * 12,,5 + 14.5 - 16,5 + 18,5 * 20.5 + 22.5 - 24,5 + 26.5 + 28,5 + 30.5",
    output: 0,
  },
  {
    describe: "incorrect 5",
    input:
      "2.5 * 4.5 + 6,5 + 8.5 - 10..5 * 12,5 + 14.5 + 16,5 + 18,5 * 20.5 + 22.5 + 24,5 + 26.5 + 28,5 + 30.5",
    output: 0,
  },
  {
    describe: "incorrect 6",
    input:
      "2.5 * 4.5 + 6,5 + 8.5 - 10.5 * 12,.5 + 14.5 + 16,5 - 18,5 * 20.5 + 22.5 + 24,5 - 26.5 + 28,5 + 30.5",
    output: 0,
  },
  {
    describe: "incorrect 7",
    input: ".",
    output: 0,
  },
  {
    describe: "incorrect 8",
    input: ",",
    output: 0,
  },
  {
    describe: "incorrect 9",
    input: "+",
    output: 0,
  },
  {
    describe: "incorrect 10",
    input: "*",
    output: 0,
  },
  {
    describe: "incorrect 11",
    input: "-",
    output: 0,
  },
  {
    describe: "incorrect 12",
    input: "111.59 *",
    output: 0,
  },
  {
    describe: "incorrect 13",
    input: "111,01 +",
    output: 0,
  },
  {
    describe: "incorrect 14",
    input: "* 111,64",
    output: 0,
  },
  {
    describe: "incorrect 15",
    input: "+ 111,80",
    output: 0,
  },
  {
    describe: "incorrect 16",
    input: "- 111,80",
    output: 0,
  },
  {
    describe: "incorrect 17",
    input: "111,80 -",
    output: 0,
  },
  {
    describe: "incorrect 18",
    input: "31,01 * 111,64 +",
    output: 0,
  },
  {
    describe: "incorrect 19",
    input: "74,99 - 10 111,80 *",
    output: 0,
  },
  {
    describe: "incorrect 20",
    input: "123456789,99 + 12345678.99 * 12345678.99",
    output: 0,
  },
];
const random = [
  {
    describe: "Test case 1",
    input:
      "0.0 + 0.0 + 0.0 - 0.0 + 0.0 * 0.0 + 0 - 0 + 0.0 * 0.0 - 0 + 0 + 0.0 * 0 - 0.0 + 0 + 0.0 + 0.0 + 0.0",
    output: 0,
  },
  {
    describe: "Test case 2",
    input:
      "1 * 1 - 1 + 1 + 1 * 1 + 1 - 1 - 1 * 1 + 1 + 1 + 1 * 1 - 1 + 1 + 1 + 1 - 1",
    output: 5,
  },
  {
    describe: "Test case 3",
    input:
      "2 * 0.5 + 3 - 4 + 5 * 6 + 7 + 8 - 9 * 10 + 11 + 12 + 13 * 14 - 15 - 16 + 17 + 18 - 19",
    output: 145,
  },
  {
    describe: "Test case 4",
    input: "111,00 * 5 + 168.64 + 32.99 * 4 + 54,01 - 99,00 + 74",
    output: 884.61,
  },
  {
    describe: "Test case 5",
    input:
      "0.5 * 0.5 - 1 + 1.5 + 2 * 2.5 + 3 + 3.5 + 4 * 4.5 + 5 + 5.5 + 6 * 6.5 - 7 + 7.5 + 8 + 8.5 + 9",
    output: 105.75,
  },
  {
    describe: "Test case 6",
    input:
      "2 * 3 + 4 + 5 + 6 * 7 + 8 + 9 + 10 * 11 + 12 - 13 + 14 * 15 + 16 + 17 + 18 + 19 + 20",
    output: 483,
  },
  {
    describe: "Test case 7",
    input:
      "0.5 * 0.5 + 0.5 - 0.5 + 0.5 * 0.5 + 0.5 - 0.5 + 0.5 * 0.5 - 0.5 + 0.5 - 0.5 * 0.5 + 0.5 + 0.5 - 0.5 + 0.5 + 0.5",
    output: 2,
  },
  {
    describe: "Test case 8",
    input:
      "10 * 10 + 10 - 10 + 10 * 10 + 10 + 10 + 10 * 10 + 10 - 10 + 10 * 10 - 10 + 10 - 10 + 10 + 10",
    output: 430,
  },
  {
    describe: "Test case 9",
    input:
      "2.5 * 3.5 + 4.5 + 5.5 - 6.5 * 7.5 + 8.5 + 9.5 - 10.5 * 11.5 + 12.5 + 13.5 + 14.5 * 15.5 - 16.5 + 17.5 - 18.5 + 19.5 + 20.5",
    output: 140.5,
  },
  {
    describe: "Test case 10",
    input:
      "1.11 * 2.22 + 3.33 + 4.44 - 5.55 * 6.66 + 7.77 + 8.88 + 9.99 * 10.0 - 11.11 + 12.22 + 13.33 * 14.44 - 15.55 + 16.66 + 17.77 + 18.88 + 19.99",
    output: 341.17,
  },
  {
    describe: "Test case 11",
    input:
      "100 - 100 * 0.5 + 200 + 300 - 400 * 0.25 + 500 - 600 + 700 * 0.75 + 800 + 900 + 1000 * 0.12 + 1100 + 1200 - 1300 + 1400 + 1500",
    output: 6595,
  },
  {
    describe: "Test case 12",
    input:
      "1 * 1 + 2 + 3 + 4 * 5 + 6 + 7 + 8 * 9 + 10 + 11 + 12 * 13 - 14 + 15 + 16 + 17 + 18",
    output: 340,
  },
  {
    describe: "Test case 13",
    input:
      "0.1 * 0.2 - 0.3 + 0.4 + 0.5 * 0.6 + 0.7 - 0.8 + 0.9 * 1.0 - 1.1 + 1.2 + 1.3 * 1.4 - 1.5 + 1.6 - 1.7 + 1.8 + 1.9",
    output: 5.24,
  },
  {
    describe: "Test case 14",
    input:
      "0.01 * 0.01 + 0.02 - 0.03 + 0.04 * 0.05 + 0.06 - 0.07 + 0.08 * 0.09 + 0.1 - 0.11 + 0.12 * 0.13 + 0.14 - 0.15 + 0.16 + 0.17 - 0.18",
    output: 0.13,
  },
  {
    describe: "Test case 15",
    input:
      "999 - 100 * 0.01 + 200 - 300 + 400 * 0.02 - 500 + 600 + 700 * 0.03 + 800 - 900 + 1000 * 0.04 + 1100 - 1200 + 1300 + 1400 + 1500",
    output: 5067,
  },
  {
    describe: "Test case 16",
    input:
      "10.01 * 10.02 + 10.03 + 10.04 - 10.05 * 10.06 + 10.07 + 10.08 + 10.09 * 10.1 - 10.11 + 10.12 + 10.13 * 10.14 + 10.15 + 10.16 + 10.17 + 10.18 + 10.19",
    output: 294.9,
  },
  {
    describe: "Test case 17",
    input:
      "5.5 * 5.5 + 6.6 - 7.7 + 8.8 * 9.9 + 10.0 + 11.1 + 12.2 * 13.3 + 14.4 - 15.5 + 16.6 * 17.7 + 18.8 + 19.9 - 20.0 + 21.1 + 22.2",
    output: 654.35,
  },
  {
    describe: "Test case 18",
    input:
      "0.5 * 0.01 + 0.02 - 0.03 + 0.04 * 0.05 + 0.06 + 0.07 - 0.08 * 0.09 + 0.1 + 0.11 + 0.12 * 0.13 - 0.14 + 0.15 + 0.16 + 0.17 + 0.18",
    output: 0.87,
  },
  {
    describe: "Test case 19",
    input:
      "1 * 0.1 + 2 - 3 + 4 * 0.2 + 5 + 6 - 7 * 0.3 + 8 + 9 - 10 * 0.4 + 11 + 12 + 13 + 14 + 15",
    output: 86.8,
  },
  {
    describe: "Test case 20",
    input:
      "1 * 100 + 2 - 3 + 4 * 200 + 5 + 6 - 7 * 300 + 8 - 9 + 10 * 400 + 11 + 12 + 13 + 14 + 15",
    output: 2874,
  },
  {
    describe: "Test case 21",
    input:
      "1 * 0 + 2 + 3 + 4 * 0 + 5 - 6 + 7 * 0 - 8 + 9 + 10 * 0 - 11 + 12 + 13 + 14 + 15",
    output: 48,
  },
  {
    describe: "Test case 22",
    input:
      "999.99 - 888,88 + 777.77 + 666,66 + 555.55 - 444,44 + 333.33 - 222,22 + 111.11 + 100,10",
    output: 1988.97,
  },
  {
    describe: "Test case 23",
    input:
      "0.1 * 0.1 + 0.2 + 0.3 - 0.4 * 0.5 + 0.6 + 0.7 - 0.8 * 0.9 + 1 + 1.1 + 1.2 * 1.3 - 1.4 + 1.5 + 1.6 + 1.7 + 1.8",
    output: 9.75,
  },
  {
    describe: "Test case 24",
    input: "0.0 + 1.23 + 2.34 - 1,99",
    output: 1.58,
  },
  {
    describe: "Test case 25",
    input:
      "1.5 * 1.5 + 2.5 + 3.5 - 4.5 * 5.5 + 6.5 + 7.5 + 8.5 * 9.5 + 10.5 - 11.5 + 12.5 * 13.5 + 14.5 + 15.5 - 16.5 + 17.5 + 18.5",
    output: 295.5,
  },
  {
    describe: "Test case 26",
    input:
      "2 * 2 + 3 + 4 + 5 * 6 - 7 + 8 + 9 * 10 + 11- 12 + 13 * 14 + 15 + 16 + 17 - 18 + 19",
    output: 362,
  },
  {
    describe: "Test case 27",
    input:
      "0.01 * 0.1 + 0.2 + 0.3 + 0.4 * 0.5 + 0.6 - 0.7 + 0.8 * 0.9 + 1 - 1.1 + 1.2 * 1.3 + 1.4 + 1.5 + 1.6 + 1.7 + 1.8",
    output: 10.78,
  },
  {
    describe: "Test case 28",
    input: "0,0 + 5.55 * 10 - 3.09",
    output: 52.41,
  },
  {
    describe: "Test case 29",
    input:
      "1 * 0.5 + 2 - 3 + 4 * 5 + 6 - 7 + 8 * 9 + 10 + 11 - 12 * 13 + 14 + 15 + 16 + 17 + 18",
    output: 35.5,
  },
  {
    describe: "Test case 30",
    input: "3 * 5 - 2 + 4 * 6 - 8 + 10 * 2",
    output: 49,
  },
  {
    describe: "Test case 31",
    input: "100.99 - 200,01 + 300.11",
    output: 201.09,
  },
  {
    describe: "Test case 32",
    input: "5 * 2 - 4 + 6 * 8 + 10 - 2 * 3",
    output: 58,
  },
  {
    describe: "Test case 33",
    input: "2 - 3 * 4 + 5 * 6 + 1",
    output: 21,
  },
  {
    describe: "Test case 34",
    input: "5.0 * 10.5 + 2,0 * 3.5 - 2.99",
    output: 56.51,
  },
  {
    describe: "Test case 35",
    input: "123,45 - 67.89 + 99.99 * 0,5",
    output: 105.56,
  },
  {
    describe: "Test case 36",
    input: "100 - 200 + 300 * 0,5 + 50.5 * 2",
    output: 151,
  },
  {
    describe: "Test case 37",
    input:
      "2.5 * 4.5 - 6.5 -8.5 + 10.5 * 12.5-14.5 -16.5 + 18.5 * 20.5 + 22.5 + 24.5 - 26.5 + 28.5 + 30.5",
    output: 555.25,
  },
  {
    describe: "Test case 38",
    input:
      "10 * 1.5 + 20 - 30 + 40 * 2.5 + 50 + 60 - 70 * 3.5 + 80 + 90 + 100 * 4.5 + 110 - 120 + 130 + 140 + 150",
    output: 1000,
  },
  {
    describe: "Test case 39",
    input:
      "5 * 0.5 - 10 + 15 + 20 * 1.5 + 25 + 30 + 35 * 2.5 - 40 + 45 + 50 * 3.5 + 55 - 60 + 65 + 70 + 75",
    output: 565,
  },
  {
    describe: "Test case 40",
    input:
      "0.1 * 0.01 + 0.02 - 0.03 + 0.04 * 0.05 + 0.06 + 0.07 + 0.08 * 0.09 - 0.1 + 0.11 + 0.12 * 0.13 + 0.14 + 0.15 - 0.16 + 0.17 + 0.18",
    output: 0.64,
  },
  {
    describe: "Test case 41",
    input:
      "2.2 * 1.2 + 3.2 + 4.2 + 5.2 * 6.2 - 7.2 + 8.2 + 9.2 * 10.2 + 11.2 + 12.2 + 13.2 + 14.2 - 15.2",
    output: 172.72,
  },
  {
    describe: "Test case 42",
    input:
      "100 * 0.01 + 200 + 300 - 400 * 0.02 + 500 + 600 + 700 * 0.03 -800 + 900 + 1000 * 0.04 + 1100 -1200 + 1300 + 1400 + 1500",
    output: 5854,
  },
  {
    describe: "Test case 43",
    input: "2 * 1 + 3 - 4 + 5 * 6 - 7 + 8 + 9 * 10 + 11 + 12 - 13 + 14 + 15",
    output: 161,
  },
  {
    describe: "Test case 44",
    input:
      "0.5 * 0.1 -1 + 1.5 + 2 * 2.5 + 3 - 3.5 + 4 * 4.5 + 5 + 5.5 + 6 * 6.5 - 7 + 7.5 + 8 + 8.5 + 9",
    output: 98.55,
  },
  {
    describe: "Test case 45",
    input:
      "1.5 * 2.5 + 3.5 + 4.5 - 5.5 * 6.5 + 7.5 - 8.5 + 9.5 * 10.5 + 11.5 - 12.5 + 13.5 + 14.5 + 15.5",
    output: 117.25,
  },
  {
    describe: "Test case 46",
    input:
      "1 * 0.5 + 2 + 3-4 * 1.5 + 5 -6 + 7 * 2.5- 8 + 9 + 10 * 3.5 + 11 + 12 - 13 + 14 + 15",
    output: 91,
  },
  {
    describe: "Test case 47",
    input:
      "10 * 0.01 + 20 - 30 + 40 * 0.02 + 50 - 60 + 70 * 0.03 + 80 - 90 + 100 * 0.04 - 110 + 120 + 130 + 140 + 150",
    output: 407,
  },
  {
    describe: "Test case 48",
    input: "11.11 - 22,22 + 33.33 - 44,44 + 55.55 + 66,66",
    output: 99.99,
  },
  {
    describe: "Test case 49",
    input: "111.11 * 0,01 - 222,22 * 0.02 - 333,33 * 0,03 + 444.44 * 0.04",
    output: 4.44,
  },
  {
    describe: "Test case 50",
    input: "2 * 2 + 3 + 4 - 5 * 6 + 7 + 8 + 9 * 10 + 11 + 12 - 13 + 14 + 15",
    output: 125,
  },
  {
    describe: "Test case 51",
    input:
      "1.1 * 0.9 + 2.1 - 3.1 + 4.1 * 5.1 + 6.1 - 7.1 + 8.1 * 9.1 + 10.1 + 11.1 - 12.1 + 13.1 + 14.1 + 15.1",
    output: 145.01,
  },
  {
    describe: "Test case 52",
    input:
      "5 * 0.1 + 10 + 15 - 20 * 0.2 + 25 - 30 + 35 * 0.3 + 40 + 45 + 50 * 0.4 - 55 + 60 + 65 + 70 + 75",
    output: 347,
  },
  {
    describe: "Test case 53",
    input:
      "2.5 * 3.5 - 4.5 + 5.5 + 6.5 * 7.5 + 8.5 - 9.5 + 10.5 * 11.5 - 12.5 + 13.5 + 14.5 - 15.5 + 16.5",
    output: 194.75,
  },
  {
    describe: "Test case 54",
    input:
      "10 * 0.1 + 20-30 + 40 * 0.2 + 50 + 60 - 70 * 0.3 + 80 + 90 + 100 * 0.4 + 110 -120 + 130 + 140 + 150",
    output: 708,
  },
  {
    describe: "Test case 55",
    input:
      "0.5 * 0.01 + 1 - 1.5 + 2 * 2.5 + 3 + 3.5 - 4 * 4.5 + 5 + 5.5 + 6 * 6.5 + 7 + 7.5 + 8 - 8.5 + 9",
    output: 65.51,
  },
  {
    describe: "Test case 56",
    input:
      "1.5 * 0.01 + 2 + 2.5 + 3 * 3.5 + 4- 4.5 + 5 * 5.5 - 6 + 6.5 + 7 * 7.5 + 8 + 8.5 - 9 + 9.5 + 10",
    output: 122.02,
  },
  {
    describe: "Test case 57",
    input:
      "0.01 * 1 + 2 + 3 - 4 * 5 + 6 + 7 + 8 * 9 + 10 - 11 + 12 * 13 + 14 + 15 + 16 + 17 -18",
    output: 269.01,
  },
  {
    describe: "Test case 58",
    input: "123,45 + 67.89 - 99,99 * 0.5 - 0.01 + 1,01",
    output: 142.35,
  },
  {
    describe: "Test case 59",
    input: "1.0 * 2.0 * 3,0 * 4,0 * 5.0 * 6.0",
    output: 720.0,
  },
  {
    describe: "Test case 60",
    input: "0.0 + 999,99 + 1.0 + 2,0 + 3.0-99.99",
    output: 906,
  },
  {
    describe: "Test case 61",
    input:
      "10 * 0.5 + 20 + 30 - 40 * 50 + 60 + 70 + 80 * 90 - 100 + 110 + 120 * 130 - 140 + 150 + 160 + 170 + 180",
    output: 21515,
  },
  {
    describe: "Test case 62",
    input: "1.01 - 9.99 * 99.99 * 0,01 + 8.88 * 88,88 * 0,02",
    output: 6.81,
  },
  {
    describe: "Test case 63",
    input: "100.0 - 200,0 - 300.0 + 400,0 + 500.0",
    output: 500.0,
  },
  {
    describe: "Test case 64",
    input: "50.0 * 4.0 - 75,0 * 2,0 + 25.0 * 6.0",
    output: 200,
  },
  {
    describe: "Test case 65",
    input: "0.01 - 0,02 - 0.03 + 0,04 + 0.05",
    output: 0.05,
  },
  {
    describe: "Test case 66",
    input:
      "123,45 + 67.89 + 99.99 * 0,5 - 11.11 + 22.22 - 33.33 + 44.44 + 55.55",
    output: 319.11,
  },
  {
    describe: "Test case 67",
    input:
      "0.01 * 2,02 - 3.03 * 4,04 - 5.05 * 6,06 + 7.07 * 8,08 + 9,09 * 10.10",
    output: 106.11,
  },
  {
    describe: "Test case 68",
    input:
      "111.11 * 0,01 - 222,22 * 0.02 + 333.33 * 0,03 - 444.44 * 0,04 + 555.55 * 0,05",
    output: 16.67,
  },
  {
    describe: "Test case 69",
    input:
      "123,45 + 67.89 - 99,99 * 0.5 + 11.11 + 22,22 - 33.33 + 44,44 + 55.55 + 66,66",
    output: 308,
  },
  {
    describe: "Test case 70",
    input: "1.0 * 2,0 * 3,0 * 4,0 * 5.0 * 6.0 * 7.0 * 8,0 * 9,0 * 10.0",
    output: 3628800,
  },
  {
    describe: "Test case 71",
    input: "999,99- 1000.0 + 1001,01 + 1002.02 + 1003,03 + 1004.04",
    output: 4010.09,
  },
  {
    describe: "Test case 72",
    input:
      "0.01 + 1,01 + 2.02 + 3,03 + 4.04 -5,05 + 6.06- 7,07 + 8.08 + 9,09 + 10.10",
    output: 31.32,
  },
  {
    describe: "Test case 73",
    input: "1000,00 * 0.01 - 100.0 * 0.1 + 10,0 * 1.0 + 1,0 * 10.0",
    output: 20,
  },
  {
    describe: "Test case 74",
    input:
      "123.45 * 2.0 + 67,89 * 3,0 - 99.99 * 4.0 + 11,11 * 5,0 + 22.22 * 6.0",
    output: 239.48,
  },
  {
    describe: "Test case 75",
    input: "1,0 + 2,0 + 3.0 - 4.0 + 5,0 + 6.0 - 7,0 + 8,0 + 9.0 + 10,0",
    output: 33,
  },
  {
    describe: "Test case 76",
    input:
      "0.01 * 2.02 * 3,03 * 4.04 * 5,05 * 6.06 * 7,07 * 8,08 * 9,09 * 10.10",
    output: 39687.65,
  },
  {
    describe: "Test case 77",
    input: "999.99- 1000,0 + 1001.01 + 1002,02 + 1003.03 - 1004,04 + 1005.05",
    output: 3007.06,
  },
  {
    describe: "Test case 78",
    input:
      "0.01 + 1,01 + 2.02 + 3,03 - 4.04 + 5,05 + 6.06 - 7,07 + 8,08 + 9.09",
    output: 23.24,
  },
  {
    describe: "Test case 79",
    input:
      "1000.00 * 0,01 - 0.01 + 100.0 * 0,1 * 0.1 - 10,0 * 1,0 * 1.0 +1.0 * 10,0 * 10.0",
    output: 100.99,
  },
  {
    describe: "Test case 80",
    input:
      "123,45 * 2.0 - 67.89 * 3,0 + 99,99 * 4.0 + 11.11 * 5,0 + 22,22 * 6.0",
    output: 632.06,
  },
  {
    describe: "Test case 81",
    input: "1,0- 2,0 - 3.0 + 4.0 + 5,0 + 6.0 - 7,0 + 8,0 + 9.0 + 10,0 + 11.0",
    output: 42,
  },
  {
    describe: "Test case 82",
    input:
      "0.01 * 2,02 * 3.03 * 4,04 * 5.05 * 6,06 * 7.07 * 8,08 * 9,09 * 10.10 * 11.11",
    output: 440929.8,
  },
  {
    describe: "Test case 83",
    input: "999,99 + 1000.0 + 1001,01 + 1002.02 + 1003,03 + 1004.04 + 1005,05",
    output: 7015.14,
  },
  {
    describe: "Test case 84",
    input:
      "0.01 - 1,01 + 2.02 - 3,03 + 4.04 + 5,05 + 6.06 + 7,07 - 8.08- 9,09 + 10.10 + 11,11",
    output: 24.25,
  },
  {
    describe: "Test case 85",
    input:
      "1000,00 * 0.01 - 0,01 + 100.0 * 0,1 * 0.1 - 10,0 * 1,0 * 1.0 + 1,0 * 10.0 * 10,0 * 100.0",
    output: 10000.99,
  },
  {
    describe: "Test case 86",
    input:
      "123.45 * 2.0 - 67,89 * 3,0 + 99.99 * 4.0 - 11,11 * 5,0 + 22.22 * 6.0 + 33,33 * 7,0",
    output: 754.27,
  },
  {
    describe: "Test case 87",
    input:
      "1,0 + 2,0 -3.0 + 4.0 + 5,0 - 6.0 + 7,0 + 8,0 + 9.0 + 10,0 - 11.0 + 12,0",
    output: 38,
  },
  {
    describe: "Test case 88",
    input:
      "0.01 - 2,02 * 3.03 * 4,04 * 5.05 * 6,06 * 7.07 + 8,08 * 9,09 * 10.10 * 11.11 * 12.12",
    output: 94537.94,
  },
  {
    describe: "Test case 89",
    input:
      "999.99 + 1000,0 - 1001.01 + 1002,02 - 1003.03 + 1004,04 + 1005.05 - 1006,06",
    output: 2001,
  },
  {
    describe: "Test case 90",
    input:
      "0.01 + 1.01 + 2,02 - 3.03 + 4,04 + 5.05 + 6,06 - 7.07 + 8,08 + 9.09 + 10,10 + 11.11 - 12,12",
    output: 34.35,
  },
  {
    describe: "Test case 91",
    input:
      "1000.00 - 0,01 * 0.01 * 0,01 + 100.0 * 0,1 * 0.1 * 0,1 + 10,0 * 1,0 * 1.0 - 1,0 + 1.0 * 10,0 * 10.0 * 10,0",
    output: 2009.1,
  },
  {
    describe: "Test case 92",
    input:
      "0.01 * 1,01 - 2.02 * 3,03 * 4.04+ 5,05 * 6.06 * 7,07 * 8,08 + 9.09 * 10,10",
    output: 1815.31,
  },
  {
    describe: "Test case 93",
    input:
      "1,0 + 2,0 - 3.0 + 4.0 - 5,0 + 6.0 + 7,0 - 8,0 + 9.0 + 10,0 + 11.0 + 12,0 + 13.0",
    output: 59,
  },
  {
    describe: "Test case 94",
    input:
      "0.01 * 2,02 -3.03 * 4,04 + 5.05 * 6,06 - 7.07 * 8,08 +9,09 * 10.10 * 11.11 * 12.12 +13.13",
    output: 12336.76,
  },
  {
    describe: "Test case 95",
    input:
      "999,99 + 1000.0 - 1001,01 + 1002.02 + 1003,03 + 1004.04 - 1005,05 + 1006.06",
    output: 4009.08,
  },
  {
    describe: "Test case 96",
    input:
      "0.01 + 1,01 + 2.02 - 3,03 + 4.04 + 5,05 + 6.06 + 7,07 + 8.08 + 9,09 - 10.10 - 11.11 + 12,12 + 13.13",
    output: 43.44,
  },
  {
    describe: "Test case 97",
    input:
      "1000,00 * 0.01 * 0,01 * 0,01 + 100.0 * 0,1 * 0.1 * 0,1 - 10,0 * 1,0 * 1.0 * 1,0 + 1,0 * 10.0 - 10,0 * 10,0 + 100.0",
    output: 0.1,
  },
  {
    describe: "Test case 98",
    input:
      "123.45 * 2.0 + 67,89 * 3,0 - 99.99 - 4.0 + 11,11 * 5,0 - 22.22 * 6.0 + 33,33 * 7,0 + 44.44 * 8,0",
    output: 857.64,
  },
  {
    describe: "Test case 99",
    input:
      "1,0 + 2,0 - 3.0 + 4.0 + 5,0 - 6.0 + 7,0 + 8,0 + 9.0- 10,0 + 11.0 + 12,0 + 13.0 + 14,0",
    output: 67,
  },
  {
    describe: "Test case 100",
    input:
      "0.01 + 2,02 * 3.03 -4,04 * 5.05 * 6,06 * 7.07 * 8,08 * 9,09 +10.10 * 11.11 * 12.12 * 130.13 * 14.14*190,99",
    output: 477878161.87,
  },
  {
    describe: "Test case 101",
    input:
      "999,99 + 1000.0 - 1001,01 + 1002.02 + 1003,03 + 1004.04 + 1005,05 - 1006.06 + 1007,07",
    output: 5014.13,
  },
  {
    describe: "Test case 102",
    input:
      "0.01 + 1,01 + 2.02 - 3,03 + 4.04 + 5,05 + 6.06 + 7,07 + 8.08 + 9,09 + 10.10 - 11.11 + 12,12 + 13.13 - 14,14",
    output: 49.5,
  },
  {
    describe: "Test case 103",
    input:
      "1000.00 * 0,01 * 0.01 * 0,01 * 0,01 - 100.0 * 0,1 * 0.1 * 0,1 * 0.1 - 10,0 * 1,0 * 1.0 * 1,0 * 1.0 - 1,0 +10.0 * 10,0 * 10,0 * 10.0",
    output: 9988.99,
  },
  {
    describe: "Test case 104",
    input:
      "123,45 * 2.0 - 67.89 * 3,0 + 99,99 * 4.0 + 11.11 * 5,0 -22,22 * 6.0 + 33.33 * 7,0 - 44,44 * 8,0",
    output: 243.21,
  },
  {
    describe: "Test case 105",
    input:
      "1,0 + 2,0 - 3.0 + 4.0 + 5,0 + 6.0 - 7,0 + 8,0 + 9.0 + 10,0 + 11.0 + 12,0 - 13.0 + 14,0 + 15.0",
    output: 74,
  },
  {
    describe: "Test case 106",
    input:
      "0.01 * 2,02 * 3.03 * 4,04 - 5.05 * 6,06 + 7.07 + 8,08 * 9,09 + 10.10 * 11.11 - 99.09",
    output: 63.28,
  },
  {
    describe: "Test case 107",
    input:
      "999,99 + 1000.0 + 1001,01 - 1002.02 + 1003,03 + 1004.04 + 1005,05 + 1006.06 - 1007,07 - 1008.08",
    output: 4002.01,
  },
  {
    describe: "Test case 108",
    input:
      "999.99 + 888,88 + 777.77 + 666,66 - 555.55 + 444,44 + 333.33 + 222,22 + 111.11 - 100,10 + 90.09 + 80.08",
    output: 3958.92,
  },
  {
    describe: "Test case 109",
    input:
      "0.01 * 1,01 * 2.02 - 3,03 * 4.04 - 5,05 * 6.06 * 7,07 + 8,08 * 9.09 * 10,10 + 11.11 + 12,12 + 13.13 + 14.14",
    output: 563.73,
  },
  {
    describe: "Test case 110",
    input:
      "123,45 * 2.0 + 67.89 * 3,0 + 99,99 * 4.0 - 11.11 * 5,0 + 22,22 * 6.0 + 33.33 * 7,0 -44,44 * 8,0 + 55.55 * 9,0",
    output: 1306.04,
  },
  {
    describe: "Test case 111",
    input: "500.99 - 300,01 + 1,09 * 3.33",
    output: 204.61,
  },
  {
    describe: "Test case 112",
    input:
      "123,45 * 2.0 + 67.89 * 3,0 - 10.99 + 99,99 * 4.0 - 10,01 + 11.11 * 5,0 + 22,22 * 6.0 + 33.33 * 7,0 + 44,44 * 8,0 + 55.55 * 9,0",
    output: 2107.18,
  },
  {
    describe: "Test case 113",
    input:
      "105 + 33,1 - 123,45 * 2.0 + 67.89 * 3,0 - 10.99 + 99,99 * 4.0 - 10,01 + 5 + 6 + 7 + 11.11 * 5,0 + 1 + 2 + 3 - 22,22 * 6.0 + 33.33 * 7,0 + 44,44 * 8,0 + 55.55 * 9,0",
    output: 1508.84,
  },
  {
    describe: "Test case 114",
    input:
      "105 + 33,1 + 123,45 * 2.0 + 67.89 * 3,0 + 10.99 + 99,99 * 4.0 + 10,01 + 5 + 6 + 7 + 11.11 * 5,0 + 1 + 2 + 3 + 22,22 * 6.0 + 33.33 * 7,0 + 44,44 * 8,0 + 55.55 * 9,0",
    output: 2311.28,
  },
  {
    describe: "Test case 115",
    input:
      "105 - 33,1 - 123,45 * 2.0 - 67.89 * 3,0 - 10.99 - 99,99 * 4.0 - 10,01 - 5 - 6 - 7 - 11.11 * 5,0 - 1 - 2 - 3 - 22,22 * 6.0 - 33.33 * 7,0 - 44,44 * 8,0 - 55.55 * 9,0",
    output: 0,
  },
];

const wholeData = [
  ...additionData,
  ...subtractionData,
  ...addAndSubData,
  ...multiplicationData,
  ...mixOperationData,
  ...edgeCasesData,
  ...random,
];

describe("Calculator sum", () => {
  it.each(wholeData)("%#: %o", (testCase) => {
    const { input, output } = testCase;
    const { value } = Calculator.sum(input);
    expect(value).toBe(output);
  });
});
