package parcialfinal.example.gestiApar.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "CONTRATO")
public class Contrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDCONTRATO")
    private Long id;

    @Column(name = "IDCLIENTE", nullable = false)
    private Long idCliente;

    @Column(name = "IDAPARTAMENTO", nullable = false)
    private Long idApartamento;

    @Column(name = "FECHAINICIO", nullable = false)
private LocalDateTime fechaInicio;

@Column(name = "FECHAFIN")
private LocalDateTime fechaFin;

    @Column(name = "VALORMENSUAL", nullable = false, precision = 12, scale = 2)
    private BigDecimal valorMensual;

    @Column(name = "OBSERVACION", length = 100)
    private String observacion;

    public Contrato() {}
}
