/**
 * 数学重音符号
 */

define(function (require) {

    var kity = require("kity"),
        pathData = [
            // (
            'M14.041,71.358C8.641,67.542,0,57.245,0,35.571c0-8.569,1.152-17.138,5.112-24.77C7.272,6.337,10.009,3.168,13.969,0   l1.152,1.512C9.505,6.985,4.752,17.282,4.752,35.571C4.824,54.005,9.505,64.23,15.121,69.846L14.041,71.358z',
            // )
            'M1.224,0c3.888,3.168,6.625,6.337,8.785,10.729c3.672,7.129,5.113,15.266,5.113,24.771c0,8.568-1.152,17.354-5.185,25.13   c-2.16,4.249-5.185,8.137-8.785,10.729L0,69.846c5.617-5.616,10.297-15.841,10.369-34.275C10.369,17.282,5.617,6.985,0,1.512   L1.224,0',
            // ( 上
            'M3.17,36.167c0-0.056-0.002-0.109-0.002-0.165c0-22.466,8.713-31.611,12.241-35.211c0-0.072,0.145-0.216,0.145-0.432   c0-0.216-0.216-0.36-0.504-0.36C14.257,0,8.137,5.329,4.608,13.249C1.008,21.242,0,29.019,0,35.931   c0,0.076,0.001,0.159,0.001,0.236H3.17z',
            // ( 下
            'M3.17,0H0c0.087,5.279,0.817,13.432,4.813,22.021c3.457,7.489,9.361,12.745,10.226,12.745c0.359,0,0.504-0.144,0.504-0.432   c0-0.072,0-0.216-0.216-0.432C12.072,30.578,3.473,21.615,3.17,0z',
            // ) 上
            'M12.384,36.167c0-0.056,0.002-0.109,0.002-0.165c0-22.466-8.713-31.611-12.241-35.211C0.145,0.72,0,0.576,0,0.36   C0,0.144,0.216,0,0.504,0c0.793,0,6.913,5.329,10.441,13.249c3.601,7.993,4.608,15.77,4.608,22.682   c0,0.076-0.001,0.159-0.001,0.236H12.384z',
            // ) 下
            'M12.372,0h3.17c-0.087,5.279-0.817,13.432-4.813,22.021C7.272,29.51,1.368,34.767,0.504,34.767   C0.145,34.767,0,34.623,0,34.334c0-0.072,0-0.216,0.216-0.432C3.47,30.578,12.069,21.615,12.372,0z'
        ];

    return kity.createClass('MatrixOperator', {

        base: require("operator/operator"),

        constructor: function () {
            this.callBase("Matrix");
        },

        applyOperand: function () {

            var args = [].slice.call(arguments),
                parentExpr = this.parentExpression,
                padding = 5,
                colNum = parentExpr.getColNum(),
                type = parentExpr.mtype,
                boxs = this.getBoxs(args);

            var maxHeights = [],
                maxWidths = [],
                tmp = 0;

            for (var i = 0, len = args.length / colNum; i < len; i++) {

                tmp = 0;

                for (var j = 0, jlen = colNum; j < jlen; j++) {
                    tmp = Math.max(tmp, boxs[i * colNum + j].height);
                    maxWidths[j] = Math.max(maxWidths[j] || 0, boxs[i * colNum + j].width);
                }

                maxHeights[i] = tmp;

            }

            this.relocation(args, boxs, maxWidths, maxHeights, colNum);

            if (type) {
                this.generateOpShape(type, args);
            }

            parentExpr.expand(padding, padding * 2);
            parentExpr.translateElement(padding, padding);

        },

        relocation: function (operands, boxs, widths, heights, colNum) {

            var offsetY = 0,
                padding = 5,
                offsetX = 0,
                index = 0;

            for (var i = 0, len = operands.length / colNum; i < len; i++) {

                offsetX = 0;

                for (var j = 0, jlen = colNum; j < jlen; j++) {

                    index = i * colNum + j;

                    operands[index].translate(offsetX + ( widths[j] - boxs[index].width ) / 2, offsetY + ( heights[i] - boxs[index].height ) / 2);

                    offsetX += widths[j] + padding;

                }

                offsetY += heights[i] + padding;

            }

        },

        generateOpShape: function (type, operands) {

            var box = this.parentExpression.getFixRenderBox(),
                padding = 5,
                offset = 0,
                shapes = null;

            switch (type) {

                case 'p':
                    shapes = this.createPShape(box, operands);
                    break;

                case 'v':
                    shapes = this.createVShape(box);
                    break;

            }

            offset += shapes[0].getFixRenderBox().width + padding;
            for (var i = 0, len = operands.length; i < len; i++) {
                operands[i].translate(offset, 0);
            }

            offset += box.width + padding;
            shapes[1].translate(offset, 0);

        },

        getBoxs: function (operands) {

            var boxs = [];

            for (var i = 0, len = operands.length; i < len; i++) {
                boxs[i] = operands[i].getFixRenderBox();
            }

            return boxs;

        },

        createPShape: function (box, operands) {

            var leftShape = null,
                group = new kity.Group(),
                opBox = null,
                diff = 0,
                offset = 0,
                shapeTop1 = null,
                shapeTop2 = null,
                shapeBottom1 = null,
                shapeBottom2 = null,
                topHeight = 0,
                bottomHeight = 0,
                width = 3,
                lineShape1 = null,
                lineShape2 = null,
                rightShape = null;

            this.addOperatorShape(group);

            leftShape = new kity.Group();
            rightShape = new kity.Group();

            group.addShape(leftShape);
            group.addShape(rightShape);

            shapeTop1 = new kity.Path(pathData[2]).fill("black");
            shapeBottom1 = new kity.Path(pathData[3]).fill("black");
            shapeTop2 = new kity.Path(pathData[4]).fill("black");
            shapeBottom2 = new kity.Path(pathData[5]).fill("black");

            shapeTop1.setAttr("shapeflag", '1');
            shapeBottom1.setAttr("shapeflag", '1');
            shapeTop2.setAttr("shapeflag", '1');
            shapeBottom2.setAttr("shapeflag", '1');

            leftShape.addShape(shapeTop1);
            leftShape.addShape(shapeBottom1);
            rightShape.addShape(shapeTop2);
            rightShape.addShape(shapeBottom2);

            opBox = shapeTop1.getFixRenderBox();
            topHeight = opBox.height;
            bottomHeight = shapeBottom1.getFixRenderBox().height;

            diff = box.height - topHeight - bottomHeight;

            if (diff > 0) {

                lineShape1 = new kity.Rect(width, diff).fill("black");
                lineShape2 = new kity.Rect(width, diff).fill("black");

                lineShape1.setAttr("shapeflag", '1');
                lineShape2.setAttr("shapeflag", '1');

                leftShape.addShape(lineShape1);
                rightShape.addShape(lineShape2);

                offset = topHeight;
                lineShape1.translate(0, offset);
                lineShape2.translate(opBox.width - width, offset);
                offset += diff;
                shapeBottom1.translate(0, offset);
                shapeBottom2.translate(0, offset);

            } else {

                offset = topHeight;

                shapeBottom1.translate(0, offset);
                shapeBottom2.translate(0, offset);

                diff = -diff / 2;

                for (var i = 0, len = operands.length; i < len; i++) {
                    operands[i].translate(0, diff);
                }

            }


            return [leftShape, rightShape];

        },

        createVShape: function (box) {

            var group = new kity.Group(),
                leftShape = new kity.Rect(3, box.height).fill("black"),
                rightShape = new kity.Rect(3, box.height).fill("black");

            leftShape.setAttr("shapeflag", '1');
            rightShape.setAttr("shapeflag", '1');

            group.addShape(leftShape);
            group.addShape(rightShape);

            this.addOperatorShape(group);

            return [leftShape, rightShape];

        }

    });

});
