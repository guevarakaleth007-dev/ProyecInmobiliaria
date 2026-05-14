package parcialfinal.example.gestiApar.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "MANTENIMIENTO")
public class Mantenimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDMANTENIMIENTO")
    private Long id;

    @Column(name = "IDAPARTAMENTO", nullable = false)
    private Long idApartamento;

    @Column(name = "IDEMPLEADO", nullable = false)
    private Long idEmpleado;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name = "FECHA", nullable = false)
    private LocalDateTime fecha;

    @Column(name = "DESCRIPCION", nullable = false, length = 200)
    private String descripcion;

    public Mantenimiento() {}
}
