import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

export const LogoFinix = ({ width = 50, height = 50 }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 674 838" fill="none">
    <Path
      d="M396.286 205.453C411.726 209.333 427.459 213.04 442.006 219.733C443.833 220.507 445.659 221.347 447.379 222.373C456.819 226.587 464.459 233.747 471.153 241.467C457.593 241.2 443.926 239.533 430.833 235.867C430.806 235.04 430.779 233.373 430.753 232.547C426.486 225.173 418.939 220.747 412.259 215.853C407.979 213.12 403.939 209.933 399.339 207.773C398.299 207.013 397.273 206.24 396.286 205.453Z"
      fill="#FFFEFE"
    />
    <Path
      d="M242.793 0C266.326 21.9333 290.846 42.8533 316.753 61.9734C331.819 73.0134 347.526 83.1467 363.353 93.04C398.713 114.907 434.273 136.933 465.579 164.467C478.153 174.4 488.339 187 497.233 200.24C506.166 213.64 511.539 230.853 506.179 246.64C514.219 252.067 521.219 259.04 526.526 267.173C537.806 285.093 538.913 307.493 534.273 327.693C533.379 330.267 533.433 333.413 531.153 335.267C525.486 321.893 514.979 310.347 502.326 303.093C500.513 302.227 498.726 301.333 496.979 300.387C481.593 293.933 464.086 292.547 447.873 296.427C445.939 296.827 444.086 297.547 442.326 298.427C438.833 299.373 435.713 301.253 432.646 303.093C425.019 308.187 419.033 315.28 413.739 322.667C402.686 337.72 401.259 358.587 408.473 375.573C409.393 377.347 410.273 379.147 411.113 380.973C423.446 401.933 441.059 419.307 452.513 440.853C453.193 442.027 453.886 443.227 454.579 444.427C466.126 465.76 473.113 489.373 476.099 513.4C476.179 515.813 476.553 518.213 477.193 520.56C477.913 531.933 477.446 543.347 477.459 554.733C475.513 588.387 466.286 621.387 451.886 651.787C446.539 663.08 439.859 673.72 435.046 685.267C454.539 655.28 471.833 623.64 494.966 596.16C520.406 566.187 553.059 542.067 589.766 527.787C578.299 539.747 567.659 552.48 558.393 566.227C543.886 587.32 532.566 610.373 518.499 631.72C517.126 633.88 515.966 636.173 514.873 638.507C518.979 634.253 522.286 629.293 526.553 625.187C548.899 603.467 573.753 584.56 598.339 565.48C610.313 557.333 622.099 548.907 634.286 541.053C645.993 532.92 658.339 525.68 669.699 517.067C666.833 535.04 660.246 552.293 653.139 569.013C650.126 575.293 647.139 581.587 643.779 587.693C627.766 617.027 603.739 642.173 574.073 657.8C571.979 658.92 569.846 659.907 567.766 661.04C565.979 661.707 564.339 662.667 562.846 663.84C570.179 661.573 577.593 659.453 584.659 656.413C593.406 652.8 601.579 647.933 609.459 642.72C611.766 641.347 613.339 638.707 616.246 638.48C604.499 655.907 592.606 673.427 577.953 688.587C548.353 720.72 512.699 746.893 474.419 767.773C463.993 773.653 453.139 778.68 442.326 783.8C438.313 785.52 434.273 787.173 430.353 789.12C385.686 807.773 339.006 821.32 291.699 831.427C276.273 834.44 260.726 836.92 245.046 838C251.139 824.827 256.766 810.787 256.353 796.027C256.753 778.827 246.113 762.627 231.326 754.4C219.179 747.413 205.299 744.64 192.113 740.32C185.486 738.253 179.059 735.627 172.593 733.12C167.726 730.88 162.806 728.8 158.033 726.4C140.099 717.133 123.086 705.707 108.993 691.173C108.673 690.653 108.033 689.627 107.713 689.107C129.499 699.133 154.206 700.867 177.753 698.12C189.953 696.76 202.473 694.507 214.673 697.107C213.926 696.627 212.406 695.64 211.646 695.16C180.006 685.267 145.913 685.173 115.299 671.747C107.979 668.587 100.899 664.893 93.8725 661.147C84.4992 655.667 75.4859 649.453 67.7525 641.813C57.5259 632.2 49.8459 620.333 41.7925 608.947C37.4992 602.44 34.0059 595.48 30.4192 588.587C30.0325 587.707 29.2858 585.933 28.9125 585.04C46.4592 595.973 64.7925 606.72 85.4059 610.493C105.393 613.867 125.739 614.267 145.993 613.827C157.206 613.293 168.393 614.813 179.593 614.613C207.099 617.24 234.353 625.227 258.073 639.6C275.913 650.453 291.859 664.893 302.859 682.773C309.766 693.84 314.633 706.44 315.326 719.573C321.459 681.4 311.593 640.48 287.153 610.253C271.459 590.76 251.966 574.44 230.486 561.653C201.193 544.093 168.819 532.467 136.273 522.507C130.686 520.053 124.899 518.107 119.286 515.733C109.113 511.627 99.4192 506.44 89.8325 501.147C65.9792 487.72 44.7392 469.027 31.0725 445.08C28.5659 440.747 26.5392 436.173 24.4459 431.64C14.3659 407.88 12.4725 381.44 15.3392 356.04C17.6725 339.147 23.0059 322.8 29.7792 307.2C38.0459 288.893 48.6592 271.52 62.2192 256.667C62.7525 256.387 63.8192 255.84 64.3392 255.56C55.0592 285.227 59.6058 317.787 71.1658 346.2C88.1792 385.48 121.406 415.893 159.379 434.653C167.819 439.6 176.886 443.333 185.553 447.867C202.139 455.933 217.819 465.733 234.526 473.587C269.779 490.853 303.086 513.64 328.153 544.147C354.966 577.267 372.086 619.68 369.579 662.72C369.233 695.907 354.753 726.693 339.099 755.213C330.219 770.267 321.473 785.84 308.099 797.467C313.913 794.707 318.046 789.587 322.433 785.053C335.766 769.787 348.179 753.693 359.499 736.867C374.313 714.587 386.539 690.613 396.419 665.76C407.593 638.48 415.606 609.707 418.086 580.267C420.793 552.88 416.459 524.88 406.313 499.32C398.606 479.24 388.566 460.067 376.553 442.227C358.233 414.027 334.153 390.253 313.926 363.493C310.059 358.36 305.873 353.347 303.539 347.293L302.459 347.467C307.286 368.973 311.686 390.68 319.593 411.333C326.393 430.467 335.646 448.627 346.219 465.933C362.219 492.44 372.513 522.653 373.926 553.693C374.393 559.987 373.913 566.32 374.326 572.64C372.486 570.533 371.886 567.773 371.059 565.2C362.193 539.4 346.433 516.8 330.513 494.933C314.366 472.373 294.513 452.8 273.393 434.947C271.019 433.013 268.859 430.853 266.859 428.547C261.473 421.8 257.166 414.28 253.753 406.347C242.939 379.013 238.953 349.013 241.979 319.8C244.366 300.72 250.166 282.2 257.779 264.587C259.873 260.027 262.073 255.52 264.433 251.107C266.166 248 268.033 244.973 269.766 241.893C278.313 228.52 288.446 216.187 299.739 205.053C288.166 195.427 277.846 183.827 271.113 170.253C268.926 165.2 267.379 159.867 266.619 154.427C271.113 156.147 275.153 158.853 279.419 161.067C281.739 162.16 284.033 163.32 286.366 164.427C290.299 166.36 294.326 168.093 298.379 169.76C301.686 171.16 304.939 172.853 308.499 173.547C305.619 170.8 301.659 169.64 298.646 167.067C287.326 156.84 276.339 145.707 269.819 131.68C269.486 131 268.819 129.613 268.473 128.92C267.193 125.813 265.833 122.733 264.459 119.653C260.646 111.307 257.926 102.507 255.766 93.5867C249.353 67.4933 244.873 40.84 243.779 14C243.273 9.34667 242.833 4.68 242.793 0ZM396.286 205.453C397.273 206.24 398.299 207.013 399.339 207.773C403.939 209.933 407.979 213.12 412.259 215.853C418.939 220.747 426.486 225.173 430.753 232.547C430.779 233.373 430.806 235.04 430.833 235.867C443.926 239.533 457.593 241.2 471.153 241.467C464.459 233.747 456.819 226.587 447.379 222.373C445.659 221.347 443.833 220.507 442.006 219.733C427.459 213.04 411.726 209.333 396.286 205.453Z"
      fill="#171B1C"
    />
    <Path
      d="M183.753 170.413C195.046 160.627 205.939 150.36 217.566 140.987C214.873 168.387 210.819 195.64 205.859 222.733C202.459 243.933 198.339 265.227 198.806 286.787C198.353 300.227 200.179 313.6 202.726 326.76C208.486 354.68 221.833 380.853 240.473 402.36C248.779 411.533 256.873 421.147 266.859 428.547C268.859 430.853 271.019 433.013 273.393 434.947C294.513 452.8 314.366 472.373 330.513 494.933C346.433 516.8 362.193 539.4 371.059 565.2C371.886 567.773 372.486 570.533 374.326 572.64C373.913 566.32 374.393 559.987 373.926 553.693C372.513 522.653 362.219 492.44 346.219 465.933C335.646 448.627 326.393 430.467 319.593 411.333C311.686 390.68 307.286 368.973 302.459 347.467L303.539 347.293C305.873 353.347 310.059 358.36 313.926 363.493C334.153 390.253 358.233 414.027 376.553 442.227C388.566 460.067 398.606 479.24 406.313 499.32C416.459 524.88 420.793 552.88 418.086 580.267C415.606 609.707 407.593 638.48 396.419 665.76C386.539 690.613 374.313 714.587 359.499 736.867C348.179 753.693 335.766 769.787 322.433 785.053C318.046 789.587 313.913 794.707 308.099 797.467C321.473 785.84 330.219 770.267 339.099 755.213C354.753 726.693 369.233 695.907 369.579 662.72C372.086 619.68 354.966 577.267 328.153 544.147C303.086 513.64 269.779 490.853 234.526 473.587C217.819 465.733 202.139 455.933 185.553 447.867C176.886 443.333 167.819 439.6 159.379 434.653C154.486 430.44 148.726 427.387 143.886 423.12C137.886 417.533 132.113 411.733 126.473 405.787C113.406 390.213 103.846 371.72 98.7526 352.027C93.0059 330.587 90.9792 307.573 96.7526 285.92C105.073 259.08 122.126 236.08 139.859 214.693C153.419 198.92 168.139 184.147 183.753 170.413Z"
      fill="#EC3A06"
    />
    <Path
      d="M606.873 259.347C607.006 258.947 607.273 258.12 607.419 257.72C629.246 273.373 641.819 299.227 646.366 325.2C648.726 336.693 648.206 348.427 648.179 360.08C645.659 403.707 623.099 443.693 593.873 475.16C589.006 480.693 582.979 485.213 578.526 491.04C607.366 471.52 634.633 448.173 653.046 418.213C659.539 407.76 665.033 396.6 668.846 384.893C669.179 384.72 669.873 384.387 670.206 384.213C671.926 397.827 673.886 411.56 672.619 425.32C671.446 455.507 660.579 484.587 645.139 510.293C633.179 529.813 619.086 548.427 601.046 562.72C600.086 563.587 599.193 564.507 598.339 565.48C573.753 584.56 548.899 603.467 526.553 625.187C522.286 629.293 518.979 634.253 514.873 638.507C515.966 636.173 517.126 633.88 518.499 631.72C532.566 610.373 543.886 587.32 558.393 566.227C567.659 552.48 578.299 539.747 589.766 527.787C553.059 542.067 520.406 566.187 494.966 596.16C471.833 623.64 454.539 655.28 435.046 685.267C439.859 673.72 446.539 663.08 451.886 651.787C466.286 621.387 475.513 588.387 477.459 554.733C477.446 543.347 477.913 531.933 477.193 520.56C477.579 498.187 477.433 475.267 484.646 453.8C491.073 436.013 501.699 420.107 513.206 405.24C524.686 392.2 538.473 381.56 551.433 370.067C565.619 357.493 578.926 343.653 589.139 327.587C600.806 309.507 607.886 288.28 608.139 266.693C607.899 264.24 608.739 261.333 606.873 259.347Z"
      fill="#EC3A06"
    />
    <Path
      d="M0.192594 448.387C20.8459 480.2 54.3926 502.84 90.9659 512.267C105.953 516.173 121.273 518.653 136.273 522.507C168.819 532.467 201.193 544.093 230.486 561.653C251.966 574.44 271.459 590.76 287.153 610.253C311.593 640.48 321.459 681.4 315.326 719.573C314.633 706.44 309.766 693.84 302.859 682.773C291.859 664.893 275.913 650.453 258.073 639.6C234.353 625.227 207.099 617.24 179.593 614.613C151.793 607.2 123.153 601.907 96.8459 589.773C95.3793 589.227 93.9792 588.467 92.5926 587.773C62.0326 573.587 36.6593 549.52 19.1526 520.907C9.61926 505.333 4.28591 487.6 1.59258 469.653C1.39258 462.52 -0.62074 455.547 0.192594 448.387Z"
      fill="#EC3A06"
    />
  </Svg>
);
