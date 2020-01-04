$(function () {
        $(".botao").click(function (e) {
            e.preventDefault();

            let cbObjeto = $(this).attr("href");

        
            if (cbObjeto == "-" ||
                cbObjeto == "+" ||
                cbObjeto == "*" ||
                cbObjeto == "/" ||
                cbObjeto == "±" ||
                cbObjeto == "%") {
                if ($(".saida").val() == "0")
                    return;
            }

            if ($(".saida").val() == "0" && cbObjeto == ".") {
                $(".saida").val("0");
                $(".visor").html("0");
            }
            else if ($(".saida").val() == "0") {
                $(".saida").val("");
                $(".visor").html("");
            }


            if (cbObjeto == "-" ||
                cbObjeto == "+" ||
                cbObjeto == "*" ||
                cbObjeto == "/" ||
                cbObjeto == "±" ||
                cbObjeto == "%") {

                let valorJaInserido = $(".saida").val()

                if (cbObjeto == "±") {
                    if (valorJaInserido != 0 && valorJaInserido != "") {

                        if (valorJaInserido.indexOf("-") > 0) {
                            $(".visor").html($(".saida").val().replace("-", "+"));
                            $(".saida").val($(".saida").val().replace("-", "+"))
                            return;
                        }
                        else if (valorJaInserido.indexOf("+") > 0) {
                            $(".visor").html($(".saida").val().replace("+", "-"));
                            $(".saida").val($(".saida").val().replace("+", "-"))
                            return;
                        }
                        else if (!$(".saida").val().match(/[(+@"\/%*--)]+/)) {
                            let numeroDigitado = $(".saida").val().match("[.0-9]+")[0]

                            $(".visor").html(numeroDigitado + "-");
                            $(".saida").val(numeroDigitado + "-")
                            return;
                        }
                    }
                    else {
                        cbObjeto = "0"
                    }
                }

                if (valorJaInserido.indexOf('+') > 0) {
                    return;
                }
                else if (valorJaInserido.indexOf('-') > 0) {
                    return;
                }
                else if (valorJaInserido.indexOf('*') > 0) {
                    return;
                }
                else if (valorJaInserido.indexOf('/') > 0) {
                    return;
                }
                else if (valorJaInserido.indexOf('%') > 0) {
                    return;
                }
            }

            if (cbObjeto == "pi") {
                if ($(".saida").val() > 0) {
                    let numeroDigitado = $(".saida").val().match("[.0-9]+")[0]

                    $(".visor").html(numeroDigitado + "*" + "pi");
                    $(".saida").val(numeroDigitado + "*" + "pi")
                    return;
                }
            }
            $(".visor").append(cbObjeto);
            $(".saida").val($(".saida").val() + cbObjeto);
        });

        $(".igual").click(function () {

            let verificaSeEhPorcentagem = $(".saida").val().indexOf("%") > 0
            let verificaSeEhPI = $(".saida").val().includes("pi") > 0

            if (verificaSeEhPorcentagem) {
                let valores = $(".saida").val().split("%")
                let resultado = calcularPorcentagem(valores[0], valores[1])

                $(".saida").val(resultado);
                $(".visor").html(resultado);
                return;
            }
            else if (verificaSeEhPI) {
                let valores = $(".saida").val().split("pi")
                let verificaSePossuiNumeros = valores.join("");

                if (verificaSePossuiNumeros) {
                    let buscarNumero = $(".saida").val().match("[.0-9]+")[0]
                    let buscarOperador = $(".saida").val().match(/[(+@"\/%*--)]+/)[0]

                    let resultado = eval(`${calcularPI(valores.length - 1)} ${buscarOperador} ${buscarNumero}`).toFixed(4)
                    
                    $(".saida").val(resultado);
                    $(".visor").html(resultado);
                    return;
                }
                else {

                    let resultado = calcularPI(valores.length - 1).toFixed(4)

                    $(".saida").val(resultado);
                    $(".visor").html(resultado);
                    return;
                }
            }

            $(".saida").val(eval($(".saida").val()));
            $(".visor").html(eval($(".saida").val()));
        });

        $(".limpar").click(function () {
            $(".saida").val("0");
            $(".visor").html("0");
        });


        let calcularPorcentagem = (valor, porcentagem) => {
            return valor * (porcentagem / 100)
        }

        let calcularPI = (valor) => {
            return Math.PI * valor
        }
    });