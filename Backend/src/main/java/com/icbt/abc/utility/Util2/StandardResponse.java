package com.icbt.abc.utility.Util2;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StandardResponse {
    String code;
    String message;
    Object data;


}
