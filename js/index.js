//预设值
var questions = [];//空数组,用来放对象,也就是各道题目
var totalQuestions = 1;//题目数量
var miniNumber = 1;//将零修改为一,减少无意义题目
var maxNumber = 5;//题目范围

//初始化自定义工具函数getRandomInRange(),用于求随机数,随机数是闭区间[min, max],包括最大值max和最小值min
function getRandomInRange (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//构建一个用来创建算术题的函数,计算出各个项目的值
function makeQuestion(maxNumber) {
	//随机得到计算符
	operators = ["＋", "－"];
	o = operators[getRandomInRange(0, 1)];
	//随机出z和x,检查是否需要调整两者数值,再算出y
	z = getRandomInRange(miniNumber, maxNumber);	
	x = getRandomInRange(miniNumber, maxNumber);	
	if (o=="＋") {
		if (x>z) {
			xx = x;
			zz = z;
			x = zz;
			z = xx;
			y = z - x;
		}
		else {
			y = z - x;
		}		
	}
	if (o=="－") {
		if (z>x) {
			xx = x;
			zz = z;
			x = zz;
			z = xx;
			y = x - z;
		}
		else {
			y = x - z;
		}		
	}
}

var app = new Vue({
		el: "#app",
		    data: {
		        equations: questions,
				hidden: true,
				totalQuestions: totalQuestions,
				miniNumber: miniNumber,
				maxNumber: maxNumber
		    },
			methods: {
				//打勾打叉
				checkAnswer: function(index) {
					var result = this.equations[index].result;
					var answer = this.equations[index].answer;
					if (answer == result) {
						document.getElementsByClassName("answer")[index].readOnly = true;
						document.getElementsByClassName("fi-x")[index].style.display="none";
						document.getElementsByClassName("fi-check")[index].style.display="inline";
					}
					else {
						document.getElementsByClassName("fi-check")[index].style.display="none";
						document.getElementsByClassName("fi-x")[index].style.color="red";
						document.getElementsByClassName("fi-x")[index].style.display="inline";
					}
				},
				//刷题函数
				reloadOnDemand: function(maxNumber, totalQuestions){
					for (i=0;i<totalQuestions;i++) {
						makeQuestion(maxNumber);
						questions.push({ bitA: x, operator: o, bitB: y, result: z, answer: "" });
					}
				}
			}
});
